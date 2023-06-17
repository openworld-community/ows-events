export type UserDbEntity = {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	photo_url: string;
	auth_date: number;
	token: string;
};

export type TGUser = Omit<UserDbEntity, 'token'>;

export type UserInfo = Omit<UserDbEntity, 'token' | 'auth_date'>;
