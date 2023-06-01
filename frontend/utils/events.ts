import parseJSON from '@/utils/json';
import {BASE_URL} from "~/constants/url";
import {EventOnPoster} from "../../common/types";
import eventCard from '@/assets/img/event-screen@2x.png'

export const localUserEventsKey = 'USER_POSTS';

// TODO убрать, когда появится авторизация
export function getUserEvents() {
	if (process.server) return [];
	return parseJSON<string[]>(localStorage.getItem(localUserEventsKey) ?? '[]', []);
}

export function addUserEvent(id: string) {
	const oldUsersPosts = getUserEvents();
	oldUsersPosts.push(id);
	localStorage.setItem(localUserEventsKey, JSON.stringify(oldUsersPosts));
}


export const getEventImage = (eventData:EventOnPoster) => {
	if (eventData?.image) {
		//TODO убрать, когда с бэка будут приходить одинаковые url
		if(eventData.image.startsWith('https')) {
			return eventData.image
		}
		return `${BASE_URL}${eventData.image}`;
	} else {
		//TODO убрать эту заглушку
		return eventCard;
	}
};