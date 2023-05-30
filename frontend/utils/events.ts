import parseJSON from '@/utils/json';

export const localUserEventsKey = 'USER_POSTS';

export function getUserEvents() {
	if (process.server) return [];
	return parseJSON<string[]>(localStorage.getItem(localUserEventsKey) ?? '[]', []);
}

export function addUserEvent(id: string) {
	const oldUsersPosts = getUserEvents();
	oldUsersPosts.push(id);
	localStorage.setItem(localUserEventsKey, JSON.stringify(oldUsersPosts));
}
