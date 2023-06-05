import { EventOnPoster, StandardResponse } from '@common/types';
import { PaymentInfo } from '@common/types/payment-info';
import { IRouteHandler } from '../../types';

type IGetJSONPaymentInfoRouteProps = {
	Params: { id: string };
	Reply: StandardResponse<PaymentInfo>;
};

type IGetJSONPaymentInfoHandlerProps = IRouteHandler<IGetJSONPaymentInfoRouteProps>;

type IGetPaymentInfoRouteProps = {
	Params: { id: string };
	Reply: StandardResponse<{
		event: EventOnPoster;
		paymentsInfo: PaymentInfo;
	}>;
};

type IGetPaymentInfoHandlerProps = IRouteHandler<IGetPaymentInfoRouteProps>;
