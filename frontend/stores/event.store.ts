import { defineStore } from 'pinia';

import { getAllTimezones } from '../services/timezone.services';
import { timezoneToString } from '../.nuxt/imports';

export const useEventStore = defineStore('event', {
	state: () => {
		//	const userStore = useUserStore();
		return {
			///	clearForm: false,
			showClearFormModal: false,
			navTo: '',
			allTimezones: []
			//	minDate: new Date(roundTime(Date.now(), 10)),
			//	eventData: {
			//		editing: false,
			//		isLoading: false,
			//		id: '',
			//		title: '',
			//		organizer: userStore.userInfo?.company ?? '',
			//		description: '',
			//		tags: [],
			//		startDate: null,
			//		startTime: null,
			//		endDate: null,
			//		endTime: null,
			//		isOnline: false,
			//		location: {
			//			country: '',
			//			city: '',
			//			address: ''
			//		},
			//		image: '',
			//		price: {
			//			value: '',
			//			currency: ''
			//		},
			//		timezone: '',
			//		url: '',
			//		isFree: false
			//	}
		};
	},
	getters: {
		// setEventToLocalStorage(state) {
		// 	if (!state.clearForm) {
		// 		localStorage.setItem(LocalStorageEnum.EVENT_DATA, JSON.stringify(state.eventData));
		// 	}
		// },
		// async controlLocation(state) {
		// 	if (!state.eventData.location.country) {
		// 		state.eventData.timezone = '';
		// 		state.eventData.location.city = '';
		// 		state.eventData.location.address = '';
		// 		state.eventData.price.currency = '';
		// 	}
		// 	if (state.eventData.location.country) {
		// 		state.eventData.timezone = await getTimezone(
		// 			state.eventData.location.country,
		// 			state.eventData.location.city
		// 		);
		// 	}
		// 	if (!state.eventData.isFree && state.eventData.location.country)
		// 		state.eventData.price.currency = getCurrencyByCountry(
		// 			state.eventData.location.country
		// 		);
		// },
		// controlDateTime(state) {
		// 		if (!state.eventData.startDate || !state.eventData.startTime) {
		// 			state.eventData.endDate = null;
		// 			state.eventData.startTime = null;
		// 		}
		// 		if (!state.eventData.endDate) {
		// 			state.eventData.endTime = null;
		// 		}
		// },
		//	checkFormFilling(state) {
		//		return !!(
		//			state.eventData.title &&
		//			state.eventData.description &&
		//			state.eventData.url &&
		//			state.eventData.startDate &&
		//			state.eventData.startTime &&
		//			// endDate & endTime both must be null or non-null
		//			(state.eventData.endDate ? state.eventData.endTime : !state.eventData.endTime) &&
		//			(state.eventData.isOnline ||
		//				(state.eventData.location.country && state.eventData.location.city)) &&
		////			state.eventData.timezone &&
		//			state.allTimezones.includes(state.eventData.timezone) &&
		//			(state.eventData.isFree ||
		//				(state.eventData.price.value && state.eventData.price.currency))
		//		);
		//	}
	},
	actions: {
		//	setEventData(posterEvent = null) {
		//	this.clearForm = false;
		//	if (posterEvent) {
		//		this.eventData = {
		//			editing: true,
		//			isLoading: false,
		//			id: posterEvent?.id ?? '',
		//			title: posterEvent?.title ?? '',
		//			organizer: posterEvent?.organizer ?? '',
		//			description: posterEvent?.description ?? '',
		//			tags: posterEvent?.tags ?? [],
		//			startDate: getDateFromEpochInMs(posterEvent?.date),
		//			startTime: getTimeFromEpochInMs(posterEvent?.date),
		//			endDate: posterEvent?.durationInSeconds
		//				? getDateFromEpochInMs(
		//						(posterEvent?.date ?? 0) + posterEvent.durationInSeconds * 1000
		//				  )
		//				: null,
		//			endTime: posterEvent?.durationInSeconds
		//				? getTimeFromEpochInMs(
		//						(posterEvent?.date ?? 0) + posterEvent.durationInSeconds * 1000
		////				  )
		//				: null,
		//			isOnline: posterEvent.isOnline ?? false,
		//			location: {
		//				country: posterEvent?.location.country ?? '',
		//				city: posterEvent?.location.city ?? '',
		//				address: posterEvent?.location.address ?? ''
		//			},
		///			image: posterEvent?.image ?? '',
		//			price: {
		//				value:
		//					posterEvent?.price?.value === 0 ? '' : posterEvent?.price?.value ?? '',
		//				currency: posterEvent?.price?.currency ?? ''
		//			},
		//			timezone: posterEvent?.timezone ? timezoneToString(posterEvent.timezone) : '',
		//			url: posterEvent?.url ?? '',
		//			isFree: posterEvent.price.value === 0
		//		};
		//	} else {
		//		const storageData = localStorage.getItem(LocalStorageEnum.EVENT_DATA);
		//		if (storageData) {
		//			const parsedData = JSON.parse(storageData);
		//			for (const key in this.eventData) {
		//				if (key in parsedData) {
		//					this.eventData[key] = parsedData[key];
		//				}
		//			}

		//			if (this.eventData.startDate) {
		//				this.eventData.startDate = new Date(this.eventData.startDate);
		//			}
		//			if (this.eventData.endDate) {
		//				this.eventData.endDate = new Date(this.eventData.endDate);
		//			}
		//		}
		//	}
		//},
		//createDefaultEventData() {
		//	localStorage.setItem(
		//		LocalStorageEnum.DEFAULT_EVENT_DATA,
		//		JSON.stringify(this.eventData)
		//	);
		//},

		resetEventData() {
			//	const userStore = useUserStore();
			this.allTimezones = [];
			this.navTo = '';
			this.showClearFormModal = false;
			//	this.minDate = new Date(roundTime(Date.now(), 10));
			//	this.eventData = {
			//		editing: false,
			//		isLoading: false,
			//		id: '',
			//		title: '',
			//		organizer: userStore.userInfo?.company ?? '',
			//		description: '',
			//		tags: [],
			//		startDate: null,
			//		startTime: null,
			//		endDate: null,
			//		endTime: null,
			//		isOnline: false,
			//		location: {
			//			country: '',
			//			city: '',
			//			address: ''
			//		},
			//		image: '',
			//		price: {
			//			value: '',
			///			currency: ''
			//		},
			//		timezone: '',
			//		url: '',
			//		isFree: false
			//	};
			//	localStorage.removeItem(LocalStorageEnum.EVENT_DATA);
			//	localStorage.removeItem(LocalStorageEnum.DEFAULT_EVENT_DATA);
		},
		async getTimezones() {
			const timezones = await getAllTimezones();
			this.allTimezones = timezones.map((timezone) => timezoneToString(timezone));
		}
		//	toggleFree() {
		//		this.eventData.isFree = !this.eventData.isFree;
		//		//убираем значение из инпута, в paramsForSubmit подставляется 0
		//		if (this.eventData.isFree) {
		//			this.eventData.price.value = '';
		//			this.eventData.price.currency = '';
		//		}
		//при отключении check "бесплатно" подтягивается валюта (если указана страна)
		//		if (!this.eventData.isFree && this.eventData.location.country) {
		//			this.eventData.price.currency = getCurrencyByCountry(
		//				this.eventData.location.country
		//			);
		//		}
		//	},
		//	toggleOnline() {
		//		this.eventData.isOnline = !this.eventData.isOnline;

		//		if (this.eventData.isOnline) {
		//			this.eventData.location.country = '';
		//			this.eventData.location.city = '';
		//			this.eventData.location.address = '';

		//			this.eventData.timezone = timezoneToString(getUserTimezone());
		//		} else {
		//			this.eventData.timezone = '';
		//		}
	}
});
