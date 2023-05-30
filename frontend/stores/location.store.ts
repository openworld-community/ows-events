import { defineStore } from 'pinia';
import { api } from '@/services/axios';
import parseJSON from '~/helpers/json';
import { LOCATION_API_URL } from '~/constants/url';

export type UserLocation = {
  code?: string;
  city?: string;
  country?: string;
};

const _getUserLocation = async (): Promise<UserLocation> => {
  try {
    const { data } = await api.get(LOCATION_API_URL);
    const location = data?.location;
    const country = location?.country;

    return {
      code: country?.code,
      city: location?.city.name,
      country: country.name
    };
  } catch (e) {
    // todo error handling
    void 1;
    throw e;
  }
};

const useLocationStore = defineStore('counter', {
  state: () => {
    if (process.server) {
      return {
        pickedCountry: '',
        countries: [],
        cities: [],
        citiesByCountry: {},
        pickedCity: '',
        userLocation: {}
      };
    }

    return {
      pickedCountry: localStorage.getItem('LOCATIONS_PICKED_COUNTRY') ?? '',
      countries: parseJSON<string[]>(localStorage.getItem('LOCATIONS_COUNTRIES') ?? '[]', []),
      cities: parseJSON<string[]>(localStorage.getItem('LOCATIONS_CITIES') ?? '[]', []),
      citiesByCountry: parseJSON<Record<string, string[]>>(
        localStorage.getItem('LOCATIONS_CITIES_BY_COUNTRY') ?? '{}',
        {}
      ),
      pickedCity: localStorage.getItem('LOCATIONS_PICKED_CITY') ?? '',
      userLocation: parseJSON<UserLocation>(localStorage.getItem('LOCATIONS_USER_LOCATION') ?? '{}')
    };
  },
  getters: {},
  actions: {
    async pickCountry(country: string) {
      if (this.pickedCountry === country) {
        return;
      }
      this.pickCity('');

      this.pickedCountry = country;
      if (process.client) {
        localStorage.setItem('LOCATIONS_PICKED_COUNTRY', country);
      }

      this.loadCitiesByCountry(country);
    },
    async pickCity(city: string) {
      this.pickedCity = city;
      if (process.client) {
        localStorage.setItem('LOCATIONS_PICKED_CITY', city);
      }
    },

    async loadCountries() {
      if (this.countries.length) {
        return;
      }

      await api.get('/location/countries').then((response) => {
        this.countries = response.data;
        if (process.client) {
          localStorage.setItem('LOCATIONS_COUNTRIES', JSON.stringify(response.data));
        }
      });
    },
    async loadCitiesByCountry(country: string) {
      if (this.citiesByCountry[country]) {
        this.cities = this.citiesByCountry[country];
        return;
      }

      if (!this.countries.find((x) => x == country)) {
        return;
      }
      await api.get(`/location/cities/${country}`).then((response) => {
        this.citiesByCountry[country] = response.data;
        this.cities = this.citiesByCountry[country] || [];
        this.citiesByCountry = { ...this.citiesByCountry };
        localStorage.setItem('LOCATIONS_CITIES_BY_COUNTRY', JSON.stringify(this.citiesByCountry));
        localStorage.setItem('LOCATIONS_CITIES', JSON.stringify(response.data));
      });
    },
    async init() {
      this.userLocation = await _getUserLocation();
      await this.loadCountries();
      if (!this.pickedCountry) return;

      await this.loadCitiesByCountry(this.pickedCountry);
      await this.pickCountry(this.pickedCountry);
      if (!this.pickedCity) return;

      await this.pickCity(this.pickedCity);
    }
  }
});

export { useLocationStore };
