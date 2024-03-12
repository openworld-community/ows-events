import jwt from 'jsonwebtoken';
import { vars } from '../config/vars';
import { ITokenData } from '../rest/types';

const key = vars.secret;

class Controller {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor,@typescript-eslint/no-empty-function

	issueRefreshToken = (data: any) =>
		jwt.sign(data, key, {
			expiresIn: '15m',
			issuer: 'AfishaPeredelano Auth Service'
		});

	issueAccessToken = (data: any) =>
		jwt.sign(data, key, {
			expiresIn: '30d',
			issuer: 'AfishaPeredelano Auth Service'
		});

	validateToken = (token: string) => {
		try {
			jwt.verify(token, key);
			return true;
		} catch (e) {
			return false;
		}
	};

	decodeToken = (token: string): ITokenData => jwt.verify(token, key) as ITokenData;
}

export const JWTController = new Controller();
