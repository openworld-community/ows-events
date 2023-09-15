import fs from 'fs';
import fsP from 'fs/promises';
import { PaymentInfo } from '@common/types/payment-info';
import { CommonErrorsEnum, SupportedLanguages } from '../../../../../common/const';
import { eventsStateController } from '../../../controllers/events-state-controller';
import { IGetJSONPaymentInfoHandlerProps, IGetPaymentInfoHandlerProps } from './type';
import { delocalizeObject } from '../../../utils/localization/delocalizeObject';

export const getPaymentInfo: IGetPaymentInfoHandlerProps = async (request) => {
	const event = await eventsStateController.getEvent(request.params.id);
	if (!event) throw new Error(CommonErrorsEnum.EVENT_NOT_FOUND);

	const delocalizedEvent = delocalizeObject(event, SupportedLanguages.ENGLISH);
	const paymentsFileMd = `assets/presets/${request.params.id}.md`;
	if (fs.existsSync(paymentsFileMd)) {
		return {
			event: delocalizedEvent,
			paymentsInfo: {
				id: event.id,
				type: 'markdown',
				source: fs.readFileSync(paymentsFileMd, 'utf-8')
			}
		};
	}

	const paymentsFile = 'assets/presets/payments-info.json';

	const paymentsInfo = JSON.parse(
		fs.existsSync(paymentsFile) ? fs.readFileSync(paymentsFile, 'utf-8') : '[]' || '[]'
	) as PaymentInfo[];

	if (!paymentsInfo?.length) throw new Error(CommonErrorsEnum.PAYMENT_INFO_NOT_FOUND);

	// todo - временная заглушка, чтоб возвращал хоть что-то для тестов
	const eventPaymentsInfo =
		paymentsInfo.find((p) => p.id === request.params.id) ?? paymentsInfo[0];
	return {
		event: delocalizedEvent,
		paymentsInfo: eventPaymentsInfo
	};
};

export const getJSONPaymentInfo: IGetJSONPaymentInfoHandlerProps = async (request) => {
	const eventId = request.params.id;
	const data = await fsP.readFile('assets/presets/payments-info.json', {
		encoding: 'utf-8'
	});
	if (!data) throw new Error(CommonErrorsEnum.PAYMENT_INFO_FILE_NOT_EXIST);
	const info = JSON.parse(data);
	if (!info) throw new Error(CommonErrorsEnum.PAYMENT_INFO_FILE_PARSE_ERROR);

	const eventPaymentInfo = info.filter((item: PaymentInfo) => item.id === eventId);
	return {
		type: 'success',
		data: eventPaymentInfo
	};
};
