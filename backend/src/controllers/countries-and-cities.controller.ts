import fs from "fs";

class CountriesAndCitiesController {
  countries: string[];
  citiesByCountry: { [key: string]: string[] } = {};
  constructor() {
    const map = JSON.parse(fs.readFileSync("./assets/countries.json", "utf8"));

    this.countries = Object.keys(map);
    this.citiesByCountry = map;
  }

  getCitiesByCountry(country: string) {
    return this.citiesByCountry[country];
  }
}

export const countriesAndCitiesController = new CountriesAndCitiesController();
