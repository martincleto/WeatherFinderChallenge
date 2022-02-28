import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

export const Search = ({ defaults = {}, onSubmit }) => {
  const [disabled, setDisabled] = useState(true);
  const { city, country } = defaults;

  const cityRef = useRef();
  const countryRef = useRef();

  const handleOnChange = () => {
    const validSearch = cityRef.current.value.trim().length && countryRef.current.value.trim().length;
    setDisabled(!validSearch);
  };

  return (
    <form onSubmit={onSubmit}> 
      <input ref={cityRef} type="text" name="city" placeholder={city} onChange={handleOnChange} />
      <input ref={countryRef} type="text" name="country" placeholder={country} onChange={handleOnChange}/>
      <button disabled={disabled}>Get Weather</button>
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
