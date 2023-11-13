import { RouteNameEnum } from '../constants/enums/route';
import { useEventStore } from '../stores/event.store';
import { LocalStorageEnum } from '../constants/enums/common';

export default defineNuxtRouteMiddleware((to, from) => {
	if (
		from.name.toString().includes(RouteNameEnum.EVENT_FORM) &&
		!to.name.toString().includes(RouteNameEnum.EVENT_FORM)
	) {
		const eventStore = useEventStore();

		if (!eventStore.clearForm) {
			const defaultEvent = localStorage.getItem(LocalStorageEnum.DEFAULT_EVENT_DATA);
			const lastEvent = localStorage.getItem(LocalStorageEnum.EVENT_DATA);

			if (lastEvent && defaultEvent !== lastEvent) {
				eventStore.$patch({
					showClearFormModal: true,
					navigateTo: to.path
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
