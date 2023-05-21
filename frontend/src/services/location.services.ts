import { api } from '@/plugins/axios'

export type UserLocation = {
  code: string
  city: string
  country: string
}

const _getUserLocation = async (): Promise<UserLocation> => {
  const url = `https://api.ipregistry.co/?key=${
    import.meta.env.VITE_IPREGISTRY_API_KEY ?? 'ryy5dlbl3v8y55x4'
  }`

  try {
    const { data } = await api.get(url)

    const location = data?.location
    const country = location?.country

    return {
      code: country?.code,
      city: location?.city.name,
      country: country.name
    }
  } catch (e) {
    throw e
  }
}

let userLocation: UserLocation = {
  code: '',
  city: '',
  country: ''
}

_getUserLocation().then((location) => {
  userLocation = location
})

const getUserLocation = (): UserLocation => {
  return userLocation
}

export { getUserLocation }
