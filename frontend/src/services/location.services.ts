import { api } from '@/plugins/axios'

export type UserLocation = {
  code: string
  city: string
  country: string
}

export const getUserLocation = async (): Promise<UserLocation> => {
  const url = `https://api.ipregistry.co/?key=${
    import.meta.env.VITE_IPREGISTRY_API_KEY ?? 'ryy5dlbl3v8y55x4'
  }`

  try {
    const { data } = await api.get(url)
    return {
      code: data?.location?.country?.code,
      city: data?.location?.city.name,
      country: data?.location?.country.name
    }
  } catch (e) {
    throw e
  }
}

export const userLocation = await getUserLocation()
