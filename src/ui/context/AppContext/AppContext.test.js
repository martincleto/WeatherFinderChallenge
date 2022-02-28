//import { LocationWeather } from '@domain/entities';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';

import { AppProvider, useApp } from './AppContext';

const mockState = [
  {
    city: 'Málaga',
    country: 'es',
    description: 'despejado',
    humidity: 31,
    temperature: 23,
    error: '',
  },
  {
    city: 'Bilbao',
    country: 'es',
    description: 'nublado',
    humidity: 23,
    temperature: 16,
    error: '',
  },
];

const mockInitialState = mockState[0];
const mockNextState = mockState[1];

// eslint-disable-next-line react/prop-types
const AppWrapper = ({ children }) => {
  const [state, setState] = useState(mockInitialState);

  return (
    <div>
      <AppProvider state={state} setState={setState}>
        {children}
      </AppProvider>
    </div>
  );
};

const Consumer = () => {
  const { state, setState } = useApp();

  const {
    city,
    country,
    description,
    error,
    humidity,
    temperature,
  } = state;

  return (
    <>
      {state ? (
        <div>
          <p>{city}</p>
          <p>{country}</p>
          <p>{description}</p> 
          <p>{error}</p> 
          <p>{humidity}</p>
          <p>{temperature}</p>

          <button onClick={() => setState(mockState[1])} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

describe('AppContext', () => {
  const customRender = () => {
    return render(
      <AppWrapper>
        <Consumer />
      </AppWrapper>
    );
  };

  const runAssertions = (state) => {
    expect(screen.getByText(state.city)).toBeInTheDocument();
    expect(screen.getByText(state.country)).toBeInTheDocument();
    expect(screen.getByText(state.description)).toBeInTheDocument();
    expect(screen.getByText(state.humidity)).toBeInTheDocument();
    expect(screen.getByText(state.temperature)).toBeInTheDocument();
  };

  test('should provide the App context', () => {
    customRender();

    runAssertions(mockInitialState);

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]); // setState

    runAssertions(mockNextState);
  });
});
