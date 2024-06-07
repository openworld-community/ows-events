export const useSendTrackingEvent = () => {
	const sendAnalytics = {
		search: (name: 'view_search_results', params: SearchType) =>
			useTrackEvent('view_search_results', params),
		login: (name: 'click_login', params: LoginType) => useTrackEvent('try_login', params),
		redirect: (name: 'redirect to event url', params: RedirectToEventType) =>
			useTrackEvent('redirect to event url', params),
		clickEvent: (name: 'click_on_event', params: ClickEventType) =>
			useTrackEvent('redirect to event url', params),
		favourites: (name: 'add_favourites', params: FavouritesType) =>
			useTrackEvent('add_favourites', params),
		formEvent: (name: 'form_event', params: FormEventType) =>
			useTrackEvent('form_event', params)
	};
	return { sendAnalytics };
};

export type SearchType = {
	search_term: string;
	city: string;
	tags: string;
};

export type LoginType = {
	method: 'Google' | 'Telegram';
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
