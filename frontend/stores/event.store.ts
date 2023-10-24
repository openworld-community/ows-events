import { defineStore } from 'pinia';
import { LocalStorageEnum } from '../constants/enums/common';
import { useUserStore } from './user.store';
import { getCurrencyByCountry } from '../utils/prices';
import { getTimezone } from '../services/timezone.services';
import { timezoneToString } from '../.nuxt/imports';

const getTimezoneByCountry = (country: string, city: string) => {
	return getTimezone(country, city);
}

export const useEventStore = defineStore('event', {
	state: () => {
		const userStore = useUserStore();
		return {
			eventData: {
				id: '',
				title: '',
				organizer: userStore.userInfo?.company ?? '',
				description: '',
				startDate: null,
				startTime: null,
				endDate: null,
				endTime: null,
				location: {
					country: '',
					city: '',
					address: ''
				},
				image: '',
				price: {
					value: '',
					currency: ''
				},
				timezone: '',
				url: ''
			},
			isFree: false
		};
	},
	getters: {
		setEventToLocalStorage(state) {
			localStorage.setItem('lastEvent', JSON.stringify(state.eventData));
		},
		checkFree(state) {
			// state.isFree = state.eventData.price.value === 0 ? true : false;
			if (state.isFree) {
				state.eventData.price.value = '';
				state.eventData.price.currency = '';
			}
		},
		controlLocation (state) {
			if (!state.isFree && state.eventData.location.country)
				state.eventData.price.currency = getCurrencyByCountry(state.eventData.location.country);
			if (!state.eventData.location.country) {
				state.eventData.timezone = '';
				state.eventData.location.city = '';
				state.eventData.location.address = '';
				state.eventData.price.currency = '';
			}
				if (state.eventData.location.country) {
					state.eventData.timezone = getTimezoneByCountry(state.eventData.location.country, state.eventData.location.city);
				}


		}
	},
	actions: {
		setEventData(posterEvent = null) {
			if (posterEvent) {
				this.eventData = {
					id: posterEvent?.id ?? '',
					title: posterEvent?.title ?? '',
					organizer: posterEvent?.organizer ?? '',
					description: posterEvent?.description ?? '',
					startDate: getDateFromEpochInMs(posterEvent?.date),
					startTime: getTimeFromEpochInMs(posterEvent?.date),
					endDate: posterEvent?.durationInSeconds
						? getDateFromEpochInMs(
								(posterEvent?.date ?? 0) + posterEvent.durationInSeconds * 1000
						  )
						: null,
					endTime: posterEvent?.durationInSeconds
						? getTimeFromEpochInMs(
								(posterEvent?.date ?? 0) + posterEvent.durationInSeconds * 1000
						  )
						: null,
					location: {
						country: posterEvent?.location.country ?? '',
						city: posterEvent?.location.city ?? '',
						address: posterEvent?.location.address ?? ''
					},
					image: posterEvent?.image ?? '',
					price: {
						value:
							posterEvent?.price?.value === 0 ? posterEvent?.price?.value ?? '' : '',
						currency: posterEvent?.price?.currency ?? ''
					},
					timezone: posterEvent?.timezone ? timezoneToString(posterEvent.timezone) : '',
					url: posterEvent?.url ?? ''
				};
			} else {
				const storageData = localStorage.getItem(LocalStorageEnum.EVENT_DATA);
				if (storageData) this.eventData = JSON.parse(storageData);
			}
		}
	}
});
