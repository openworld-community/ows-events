import { UserRoles } from '../../common/const/userRoles';
import { useUserStore } from '../stores/user.store';

type EventRoles = {
	edit: UserRoles[];
	delete: UserRoles[];
};

const eventRoles: EventRoles = {
	edit: [UserRoles.MODERATOR, UserRoles.ADMIN],
	delete: [UserRoles.ADMIN]
};

export const validateEventRole = (creatorId: string, action: keyof EventRoles) => {
	const user = useUserStore();
	return eventRoles[action].includes(user.userInfo.role) || user.id === creatorId;
};
