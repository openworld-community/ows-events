import { UserRoles } from '../const/userRoles';

export type UserDbEntity = {
	telegram: {
		id: string;
		first_name: string;
		last_name: string;
		username: string;
		photo_url: string;
		auth_date: number;
	};

	google: {
		userid: string;
		iat: number;
		exp: number;
	};

	userInfo: {
		last_name: string;
		first_name: string;
		nickname: string;
		company: string;
		email: string;
		phone: string;
	};

	localAuth: {
		email: string;
		password: string;
		salt: string;
	};
	token: string;

	favorites: string[];
	role: UserRoles;
};

export type TGUser = UserDbEntity['telegram'];

export type GoogleUser = UserDbEntity['google'];

export type TGUserInfo = Omit<TGUser, 'auth_date'>;

export type UserInfo = UserDbEntity['userInfo'];

export type UserCookieInfo = UserInfo & {
	id: string;
	role: UserRoles;
};

export type LocalAuthInfo = Omit<UserDbEntity['localAuth'], 'salt'>;

export type PostUserInfo = {
	last_name: string;
	first_name: string;
	nickname: string;
	company: string;
	email: string;
	phone: string;
};
