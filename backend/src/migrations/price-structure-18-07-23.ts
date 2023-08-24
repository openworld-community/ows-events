import path from 'path';
import mongoose from 'mongoose';
import { vars } from '../config/vars';

/*  Title: Migration to change price structure
	Reason: Addition of currency field and max and min price value fields;
	Changes:
		Previous price type and mongoose schema:
			{
				price: string
			}
		New user type and mongoose schema:
			{
				price: {
					minValue: number,
					value: number,
					maxValue: number,
					currency: string
				};
			}
	Comment:
		This shit work once and then falling, so don't use it on everyday basis.
		Just to avoid hand documents rewriting.
*/

export const migrate = async () => {
	const client = new mongoose.mongo.MongoClient(vars.mongo.uri);
	const db = client.db();
	const events = db.collection('events');

	const pipeline = [
		{
			$addFields: {
				price: {
					$cond: {
						if: {
							$or: [
								{
									$eq: ['$price', null]
								},
								{
									$eq: ['$price', '']
								}
							]
						},
						then: null,
						else: {
							$split: [
								{
									$toString: '$price'
								},
								' '
							]
						}
					}
				}
			}
		},
		{
			$addFields: {
				price: {
					$cond: {
						if: {
							$eq: ['$price', null]
						},
						then: null,
						else: {
							$cond: {
								if: {
									$or: [
										{
											$eq: ['$price', null]
										},
										{
											$not: {
												$eq: [
													{
														$size: '$price'
													},
													2
												]
											}
										}
									]
								},
								then: {
									minValue: null,
									value: {
										$convert: {
											input: {
												$arrayElemAt: ['$price', 0]
											},
											to: 'int',
											onError: {
												type: 'Error',
												value: {
													$arrayElemAt: ['$price', 0]
												}
											}
										}
									},
									maxValue: null,
									currency: 'RSD'
								},
								else: {
									$cond: {
										if: {
											$eq: [
												{
													$arrayElemAt: ['$price', 0]
												},
												'от'
											]
										},
										then: {
											minValue: {
												$convert: {
													input: {
														$arrayElemAt: ['$price', 1]
													},
													to: 'int',
													onError: {
														type: 'Error',
														value: {
															$arrayElemAt: ['$price', 1]
														}
													}
												}
											},
											value: null,
											maxValue: null,
											currency: 'RSD'
										},
										else: {
											$cond: {
												if: {
													$eq: [
														{
															$arrayElemAt: ['$price', 0]
														},
														'до'
													]
												},
												then: {
													minValue: null,
													value: null,
													maxValue: {
														$convert: {
															input: {
																$arrayElemAt: ['$price', 1]
															},
															to: 'int',
															onError: {
																type: 'Error',
																value: {
																	$arrayElemAt: ['$price', 1]
																}
															}
														}
													},
													currency: 'RSD'
												},
												else: {
													minValue: null,
													value: {
														$arrayElemAt: ['$price', 0]
													},
													maxValue: null,
													currency: {
														$arrayElemAt: ['$price', 1]
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		{
			$merge: {
				into: 'events',
				on: '_id',
				whenMatched: 'replace',
				whenNotMatched: 'insert'
			}
		}
	];

	try {
		const res = await events.aggregate(pipeline).toArray();
		// eslint-disable-next-line no-console
		console.log(res);
		// eslint-disable-next-line no-console
		console.log(`Migration ${path.basename(__filename, '.ts')} successfull`);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(`MigrationError: migration ${path.basename(__filename, '.ts')}`);
		// eslint-disable-next-line no-console
		console.error(e);
	}
};
