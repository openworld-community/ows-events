export type UserDbEntity = {
	token: string;
	userNickName: string;
	firstNickName: string;
	lastNickName: string;
	id: number;
};

export type UserInfo = Omit<UserDbEntity, 'token'>;
