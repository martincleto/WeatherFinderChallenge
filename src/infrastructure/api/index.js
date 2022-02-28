import {
  API_KEY,
  API_URL,
  DEFAULT_UNITS
} from "../../config";

export const getWeather = async ({ target }) => {
  try {
    const { city, country } = target.elements;
    const params = {
      q: `${city.value},${country.value}`,
      appid: API_KEY,
      units: DEFAULT_UNITS,
    };
    const enpoint = 'weather'

    /* @TODO asbtract this to a `request` util: request(method, enpoint, body?) */
    const url = new URL(enpoint, API_URL);
    url.search = new URLSearchParams(params).toString();

    const api_call = await fetch(url);
    const response = await api_call.json();

    if (response?.cod === '404') {
      return Promise.reject(response?.message);
    }

    return response;
  } catch (error) {
    Promise.reject(error?.message);
  }
};