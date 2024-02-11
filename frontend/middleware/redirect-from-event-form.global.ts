import { RouteNameEnum, RoutePathEnum } from '../constants/enums/route';
import { useEventStore } from '../stores/event.store';
import { LocalStorageEnum } from '../constants/enums/common';
import { useUserStore } from '../stores/user.store';

export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useUserStore();
	console.log(from.name.toString().includes(RouteNameEnum.EVENT_EDIT));
	console.log('from', from.name.toString());
	console.log('to', to.name.toString());

	if (
		from.name.toString().includes(RouteNameEnum.EVENT_EDIT) &&
		!to.name.toString().includes(RouteNameEnum.EVENT_EDIT)

		//userStore.isAuthorized
	) {
		const last = localStorage.getItem(LocalStorageEnum.EVENT_DATA);
		if (last !== null) {
			//This means that change route coused not submit button, submit button clear storage
			//fact that form was not touched at all is checking in event form,
			const eventStore = useEventStore();
			eventStore.$patch({
				navTo: to.path
			});
			return false;
		}
	} else {
		return true;
	}
});
