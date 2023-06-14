import { ITelegramHandler } from './type';
import { userController } from '../../../controllers/user-controller';
import { vars } from '../../../config/vars';

export const telegramLogin: ITelegramHandler = async (request, reply) => {
	const data = request.body;
	const token = await userController.addTGUser(data);
	reply.redirect(302, `${vars.frontend_url}/postauth/${token}`);
};
