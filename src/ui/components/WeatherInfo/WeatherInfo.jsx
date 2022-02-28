import PropTypes from 'prop-types';
import React from "react";

export const WeatherInfo = ({ content }) => {
  const {
    city,
    country,
    description,
    error,
    humidity,
    temperature,
  } = content || {};

  return (
    <div className="weather__info">
      {error? (
        <p className="weather__error">{error}</p>
      ) : (
        <>
          {content &&
            <>
              <p className="weather__key">
                {" "}
                Location:
                <span className="weather__value">
                  {" "}
                  {city}, {country}
                </span>
              </p>
              <p className="weather__key">
                {" "}
                Temperature:
                <span className="weather__value">
                  {" "}
                  {temperature}{" "}
                </span>
              </p>
              <p className="weather__key">
                {" "}
                Humidity:
                <span className="weather__value">
                  {" "}
                  {humidity}{" "}
                </span>
              </p>
              <p className="weather__key">
                {" "}
                Conditions:
                <span className="weather__value">
                  {" "}
                  {description}{" "}
                </span>
              </p>
            </>
          }
        </>
      )}
    </div>
  );
};

WeatherInfo.displayName = 'WeatherInfo';
WeatherInfo.propTypes = {
  info: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
    humidity: PropTypes.number,
    temperature: PropTypes.number,
  }),
  error: PropTypes.string,
};
