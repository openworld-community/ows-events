import { defineStore } from 'pinia';
import { EventOnPoster } from '../../common/types';
import { getEvents, getEventsByParams } from '~/services/events.services';

const useEventsStore = defineStore('events', {
	state: () => {
		return {
			events: [] as EventOnPoster[],
			search: '',
			country: '',
			city: ''
		};
	},
	getters: {},
	actions: {
		async loadPosterEvents() {
			if (this.search || this.country || this.city) {
				this.events = await getEventsByParams({
					searchLine: this.search,
					country: this.country,
					city: this.city
				});
			} else {
				this.events = await getEvents();
			}
		}
	}
});

export { useEventsStore };
