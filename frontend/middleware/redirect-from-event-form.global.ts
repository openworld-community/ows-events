import { RouteNameEnum, RoutePathEnum } from '../constants/enums/route';
import { useEventStore } from '../stores/event.store';
import { LocalStorageEnum } from '../constants/enums/common';
import { useUserStore } from '../stores/user.store';

export default defineNuxtRouteMiddleware((to, from) => {
	console.log('kjhkjgjkgk', to, from);
	if (
		from.name.toString().includes(RouteNameEnum.EVENT) &&
		to.name.toString().includes(RouteNameEnum.EVENT_FORM) &&
		!localStorage.getItem(LocalStorageEnum.DEFAULT_EVENT_DATA)
	) {
		const localePath = useLocalePath();
		return (to.path = localePath(RoutePathEnum.HOME));
	}
	const userStore = useUserStore();
	if (
		from.name.toString().includes(RouteNameEnum.EVENT_FORM) &&
		!to.name.toString().includes(RouteNameEnum.EVENT_FORM) &&
		userStore.isAuthorized
	) {
		const eventStore = useEventStore();

		if (!eventStore.clearForm) {
			let defaultEvent = localStorage.getItem(LocalStorageEnum.DEFAULT_EVENT_DATA);
			let lastEvent = localStorage.getItem(LocalStorageEnum.EVENT_DATA);

			let parsedDefaultEvent = null;
			let parsedLastEvent = null;
			if (defaultEvent) {
				parsedDefaultEvent = JSON.parse(defaultEvent);
				if (parsedDefaultEvent.tags.length) {
					parsedDefaultEvent.tags.sort();
				}
				defaultEvent = JSON.stringify(parsedDefaultEvent);
			}
			if (lastEvent) {
				parsedLastEvent = JSON.parse(lastEvent);
				if (parsedLastEvent.tags.length) {
					parsedLastEvent.tags.sort();
				}

				lastEvent = JSON.stringify(parsedLastEvent);
			}

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
