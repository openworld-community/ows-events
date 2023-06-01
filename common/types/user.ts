export type UserDbEntity = {
	token: string;
	userNickName: string;
	firstNickName: string;
	lastNickName: string;
	id: string;
};

export type UserInfo = Omit<UserDbEntity, 'token'>;
