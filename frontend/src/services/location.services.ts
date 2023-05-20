import { api } from '@/plugins/axios';

export const getUserLocation = async (): Promise<string> => {
  const url = 
    `https://api.ipregistry.co/?key=${import.meta.env.VITE_IPREGISTRY_API_KEY ?? 'ryy5dlbl3v8y55x4'}`;

  try {
    const { data } = await api.get(url);
    return data?.location?.country?.code;
  } catch (e) {
    throw e;
  }
};