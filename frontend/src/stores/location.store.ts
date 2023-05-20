import { api } from '@/plugins/axios'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('counter', {
  state: () => {
    return {
      pickedCountry: localStorage.getItem('LOCATIONS_PICKED_COUNTRY') || '',
      countries: JSON.parse(localStorage.getItem('LOCATIONS_COUNTRIES') || '[]'),
      cities: JSON.parse(localStorage.getItem('LOCATIONS_CITIES') || '[]'),
      citiesByCountry: JSON.parse(localStorage.getItem('LOCATIONS_CITIES_BY_COUNTRY') || '{}')
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
      })
    }
  }
})
