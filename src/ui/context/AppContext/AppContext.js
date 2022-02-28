import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';

const AppContext = React.createContext();

export const AppProvider = ({ children, state, setState }) => {
  const value = useMemo(
    () => ({
      state,
      setState
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);

AppProvider.propTypes = {
  children: PropTypes.node,
  state: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
    humidity: PropTypes.number,
    temperature: PropTypes.number,
    error: PropTypes.string,
  }),
};
