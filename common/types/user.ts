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
		last_name: string;
		first_name: string;
		nickname: string;
		company: string;
		email: string;
		phone: string;
	};

	localAuth: {
		login: string;
		password: string;
		salt: string;
	};
	token: string;

	favorites: string[];
};

export type TGUser = UserDbEntity['telegram'];

export type TGUserInfo = Omit<TGUser, 'auth_date'>;

export type UserInfo = UserDbEntity['userInfo'];

export type LocalAuthInfo = UserDbEntity['localAuth'];

export type PostUserInfo = {
	last_name: string;
	first_name: string;
	nickname: string;
	company: string;
	email: string;
	phone: string;
};
