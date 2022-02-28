import {render, screen} from '@testing-library/react';
import React from 'react';

import {WeatherInfo} from './WeatherInfo';

const mockContent = {
  city: 'Zaragoza',
  country: 'ES',
  description: 'Despejado',
  humidity: 77,
  temperature: 10.6,
  error: '',
};

const mockError = 'I am an error message'

describe('<WeatherInfo>', () => {
  test('should render with content', () => {
    render(<WeatherInfo content={mockContent} />);

    expect(screen.getByText(mockContent.city, { exact: false })).toBeInTheDocument();
    //expect(screen.getByText(mockContent.country)).toBeInTheDocument();
    expect(screen.getByText(mockContent.description, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockContent.humidity, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(mockContent.temperature, { exact: false })).toBeInTheDocument();
  });

  test('should render with error', () => {
    render(<WeatherInfo content={{error: mockError}} />);

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });
});