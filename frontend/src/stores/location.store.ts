import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'

export type UserLocation = {
  code?: string
  city?: string
  country?: string
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

const useLocationStore = defineStore('counter', {
  state: () => {
    return {
      pickedCountry: localStorage.getItem('LOCATIONS_PICKED_COUNTRY') || '',
      countries: JSON.parse(localStorage.getItem('LOCATIONS_COUNTRIES') || '[]'),
      cities: JSON.parse(localStorage.getItem('LOCATIONS_CITIES') || '[]'),
      citiesByCountry: JSON.parse(localStorage.getItem('LOCATIONS_CITIES_BY_COUNTRY') || '{}'),
      pickedCity: localStorage.getItem('LOCATIONS_PICKED_CITY') || '',
      userLocation:
        (JSON.parse(localStorage.getItem('LOCATIONS_USER_LOCATION') || '{}') as UserLocation) ||
        null
    }
  },
  getters: {},
  actions: {
    async pickCountry(country: string) {
      if (this.pickedCountry === country) {
        return
      } else {
        this.pickCity('')
      }

      this.pickedCountry = country
      localStorage.setItem('LOCATIONS_PICKED_COUNTRY', country)

      this.loadCitiesByCountry(country)
    },
    async pickCity(city: string) {
      this.pickedCity = city
      localStorage.setItem('LOCATIONS_PICKED_CITY', city)
    },

    async loadCountries() {
      if (this.countries.length) {
        return
      }

      await api.get('/location/countries').then((response) => {
        this.countries = response.data
        localStorage.setItem('LOCATIONS_COUNTRIES', JSON.stringify(response.data))
      })
    },
    async loadCitiesByCountry(country: string) {
      if (this.citiesByCountry[country]) {
        this.cities = this.citiesByCountry[country]
        return
      }

      await api.get(`/location/cities/${country}`).then((response) => {
        this.citiesByCountry[country] = response.data
        this.cities = this.citiesByCountry[country]
        this.citiesByCountry = { ...this.citiesByCountry }
        localStorage.setItem('LOCATIONS_CITIES_BY_COUNTRY', JSON.stringify(this.citiesByCountry))
        localStorage.setItem('LOCATIONS_CITIES', JSON.stringify(response.data))
      })
    },
    async init() {
      this.userLocation = await _getUserLocation()

      if (!localStorage.getItem('LOCATIONS_PICKED_COUNTRY')) {
        localStorage.setItem('LOCATIONS_PICKED_COUNTRY', this.userLocation?.country || '')
      }
      this.pickedCountry = localStorage.getItem('LOCATIONS_PICKED_COUNTRY') || ''

      if (!localStorage.getItem('LOCATIONS_PICKED_CITY')) {
        localStorage.setItem('LOCATIONS_PICKED_CITY', this.userLocation?.city || '')
      }
      this.pickedCity = localStorage.getItem('LOCATIONS_PICKED_CITY') || ''

      await this.loadCountries()
      if (!this.pickedCountry) {
        return
      }
      await this.loadCitiesByCountry(this.pickedCountry)
      await this.pickCountry(this.pickedCountry)

      if (!this.pickedCity) {
        return
      }

      await this.pickCity(this.pickedCity)
    }
  }
})

setTimeout(() => {
  const locationStore = useLocationStore()
  locationStore.init()
})

export { useLocationStore }
