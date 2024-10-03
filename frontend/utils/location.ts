import type { Location } from '../../common/types/address';

export const formatLocation = (location: Location) => {
	return `${location.country}, ${location.city}, ${location.address}`;
};
