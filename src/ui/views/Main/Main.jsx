import React from 'react';

import { DEFAULT_CITY, DEFAULT_COUNTRY } from '../../../config';
import { getWeather } from '../../../infrastructure/api';
import { useApp } from '../../context';
import { Search, WeatherInfo } from '../../components';

export const MainView = () => {
  const { state, setState }  = useApp();

  const searchDefaults = {
    city: DEFAULT_CITY,
    country: DEFAULT_COUNTRY,
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await getWeather(event);

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
              <Search defaults={searchDefaults} onSubmit={handleSubmit}/>
              <WeatherInfo content={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MainView.displayName = 'MainView';