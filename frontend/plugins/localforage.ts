import localForage from 'localforage';
export default defineNuxtPlugin(() => {
	const locationStoreForage = localForage.createInstance({
		storeName: 'locationStoreForage'
	});
	return { provide: { locationStoreForage } };
});
