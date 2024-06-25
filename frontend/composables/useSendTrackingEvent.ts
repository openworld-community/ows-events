enum AnalyticEventsEnum {
	SEARCH = 'view_search_results',
	LOGIN = 'click_login',
	REDIRECT = 'redirect to event url',
	CLICK_EVENT = 'click_on_event',
	FAVOURITES = 'add_favourites',
	FORM_EVENT = 'form_event'
}

export const useSendTrackingEvent = () => {
	const sendAnalytics = {
		search: (params: SearchType) => useTrackEvent(AnalyticEventsEnum.SEARCH, params),
		login: (params: LoginType) => useTrackEvent(AnalyticEventsEnum.LOGIN, params),
		redirect: (params: RedirectToEventType) =>
			useTrackEvent(AnalyticEventsEnum.REDIRECT, params),
		clickEvent: (params: ClickEventType) =>
			useTrackEvent(AnalyticEventsEnum.CLICK_EVENT, params),
		favourites: (params: FavouritesType) =>
			useTrackEvent(AnalyticEventsEnum.FAVOURITES, params),
		formEvent: (params: FormEventType) => useTrackEvent(AnalyticEventsEnum.FORM_EVENT, params)
	};
	return { sendAnalytics };
};

export type SearchType = {
	search_term: string;
	city: string;
	tags: string;
};

export type LoginType = {
	method: 'google' | 'telegram' | 'local_auth' | 'local_signup';
};

export type RedirectToEventType = {
	link_url: string;
	id_event: string;
	country?: string;
	city?: string;
	online: boolean;
};
export type ClickEventType = {
	id_creator: string;
	id_event: string;
	country?: string;
	city?: string;
	online: boolean;
};
export type FavouritesType = {
	id_user: string;
	id_event: string;
	country?: string;
	city?: string;
	online: boolean;
};
export type FormEventType = FavouritesType;
