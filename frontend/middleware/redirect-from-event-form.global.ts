import { RouteNameEnum } from '../constants/enums/route';
import { useEventStore } from '../stores/event.store';
import { LocalStorageEnum } from '../constants/enums/common';
import { useUserStore } from '../stores/user.store';

export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useUserStore();
	if (
		from.name.toString().includes(RouteNameEnum.EVENT_FORM) &&
		!to.name.toString().includes(RouteNameEnum.EVENT_FORM) &&
		userStore.isAuthorized
	) {
		const eventStore = useEventStore();

		if (!eventStore.clearForm) {
			const defaultEvent = localStorage.getItem(LocalStorageEnum.DEFAULT_EVENT_DATA);
			const lastEvent = localStorage.getItem(LocalStorageEnum.EVENT_DATA);

			if (lastEvent && defaultEvent !== lastEvent) {
				eventStore.$patch({
					showClearFormModal: true,
					navTo: to.path
				});
				return false;
			} else {
				eventStore.$patch({ clearForm: true });
				eventStore.resetEventData();
				return true;
			}
		} else {
			eventStore.resetEventData();
			return true;
		}
	}
});
