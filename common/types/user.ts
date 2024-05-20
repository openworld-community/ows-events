import { UserRoles } from '../const/userRoles';

export type UserDbEntity = {
	id: string;
	telegram: TGUserData;

	google: GoogleUserData;

	userInfo: UserInfo;

	localAuth: LocalAuthData;
	token: string;
	favorites: string[];
	role: UserRoles;
};

export type TGUserData = {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	photo_url: string;
	auth_date: number;
};

export type GoogleUserData = {
	userid: string;
	iat: number;
	exp: number;
};

export type LocalAuthData = {
	email: string;
	password: string;
	salt: string;
};

export type UserInfo = {
	last_name: string;
	first_name: string;
	nickname: string;
	company: string;
	email: string;
	phone: string;
};

export type UserCookie = UserInfo & {
	id: string;
	role: UserRoles;
};

export type PublicTGUserData = Omit<TGUserData, 'auth_date'>;

export type PublicLocalAuthData = Omit<LocalAuthData, 'salt'>;
