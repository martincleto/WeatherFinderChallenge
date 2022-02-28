import React, { useEffect, useState } from 'react';

import { AppProvider } from './ui/context';
import { Search, WeatherInfo } from './ui/components';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const { REACT_APP_OPENWEATHERMAP_API_KEY } = process.env;

export const App = () => {
  const [state, setState] = useState();

  const getWeather = async ({ target }) => {
    try {
      const { city, country } = target.elements;
      const _city = city.value || 'Madrid';
      const _country = country.value || 'es';
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${_city},${_country}&appid=${REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
      );
      const response = await api_call.json();

      if (response?.cod === '404') {
        return Promise.reject(response?.message);
      }

      return response;
    } catch (error) {
      Promise.reject(error?.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await getWeather(event);

      console.log('data', data);

      setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      });

    } catch (error) {
      setState({ error: error.message });
    }
  };

  return (
    <AppProvider state={state} setState={setState}>
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-5 title-container">
                  <div>
                    <h1 className="title-container__title">Weather Finder</h1>
                    <h3 className="title-container__subtitle">
                      Find out temperature, conditions and more...
                    </h3>
                  </div>
                </div>
                <div className="col-7 form-container">
                  <Search defaults={{ city: 'Madrid', country: 'Es' }} onSubmit={handleSubmit}/>
                  <WeatherInfo content={state} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};
