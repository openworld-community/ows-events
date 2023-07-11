export type UserDbEntity = {
	telegram: {
		id: string;
		first_name: string;
		last_name: string;
		username: string;
		photo_url: string;
		auth_date: number;
	};
	userInfo: {
		family: string;
		name: string;
		nickname: string;
		company: string;
		email: string;
		phone: string;
	};
	token: string;
};

export type TGUser = UserDbEntity['telegram'];

export type TGUserInfo = Omit<TGUser, 'auth_date'>;

export type UserInfo = UserDbEntity['userInfo'];
