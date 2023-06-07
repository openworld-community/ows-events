import { api } from '~/utils/axios';

export const deleteEvent = async (id: string) => {
	const token = useCookie<string>('token').value;

	if (!token) {
		throw new Error('You are not authorized');
	}

	await api.post(
		'/events/delete',
		{ id },
		{
			headers: {
				Authorization: token
			}
		}
	);
};

//EVENT IMAGES
export const postEventImage = async (img?: File): Promise<string> => {
	if (!img) {
		return '';
	}

	const formData = new FormData();
	formData.append('image', img);
	const { data } = await api.post('/image/add', formData);
	return data.data.path;
};

export const deleteEventImage = async (path: string) => {
	await api.post('/image/delete', { path });
};
