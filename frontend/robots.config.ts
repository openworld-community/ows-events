import { RoutePathEnum } from './constants/enums/route';

// https://nuxt.com/modules/robots
export default [
	{ UserAgent: '*' },
	{
		Disallow: [
			RoutePathEnum.USER_PAGE,
			RoutePathEnum.USER_FAVOURITES,
			RoutePathEnum.USER_MY_EVENTS,
			//	RoutePathEnum.EVENT_FORM,
			RoutePathEnum.EVENT_EDIT,
			RoutePathEnum.LIMITATION_OF_LIABILITY
		]
	}
];
