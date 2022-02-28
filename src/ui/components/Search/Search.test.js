import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import { Search } from './Search';

const mockDefaults = {
  city: 'Manchester',
  country: 'UK',
}
const mockHandleSubmit = jest.fn(e => e.preventDefault());

describe('<Search>', () => {
  test('should render', () => {
    render(<Search defaults={mockDefaults} onSubmit={mockHandleSubmit} />);

    expect(screen.getByPlaceholderText(mockDefaults.city)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(mockDefaults.country)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should fire a callback if valid search', () => {
    render(<Search defaults={mockDefaults} onSubmit={mockHandleSubmit} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockHandleSubmit).not.toHaveBeenCalled();

    fireEvent.change(
      screen.getByPlaceholderText(mockDefaults.city),
      {target: {value: mockDefaults.city}}
    );
    fireEvent.change(
      screen.getByPlaceholderText(mockDefaults.country),
      {target: {value: mockDefaults.country}}
    );
    fireEvent.click(screen.getByRole('button'));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});