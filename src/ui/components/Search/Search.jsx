import PropTypes from 'prop-types';
import React from 'react';

export const Search = ({ defaults = {}, onSubmit }) => {
  // onSubmit -> this.getWeather
  const { city, country } = defaults;

  return (
    <form onSubmit={onSubmit}> 
      <input type="text" name="city" placeholder={city} />
      <input type="text" name="country" placeholder={country} />
      <button>Get Weather</button>
    </form>
  );
};

Search.displayName = 'Search';
Search.propTypes = {
  defaults: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};
