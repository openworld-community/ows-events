import { defineStore } from 'pinia';
import type { EventOnPoster } from '../../common/types';
import { LocalStorageEnum } from '../constants/enums/common';
import { useUserStore } from './user.store';

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
			}
		};
	},
	getters: {
		setEventToLocalStorage(state) {
			localStorage.setItem('lastEvent', JSON.stringify(state.eventData));
		}
	},
	actions: {
		setEventData(posterEvent = null) {
			if(posterEvent) {
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
						value: posterEvent?.price?.value === 0 ? posterEvent?.price?.value ?? '' : '',
						currency: posterEvent?.price?.currency ?? ''
					},
					timezone: posterEvent?.timezone ? timezoneToString(posterEvent.timezone) : '',
					url: posterEvent?.url ?? ''
				};
			}
			else {
				const storageData = localStorage.getItem(LocalStorageEnum.EVENT_DATA);
				if (storageData) this.eventData = JSON.parse(storageData);
			}
		}
	}
});
