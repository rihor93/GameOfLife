import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders learn react link', async () => {
  render(<App />);
  const boardComponent = screen.getAllByTestId('ControlComponentClasses');
  expect(boardComponent).toHaveLength(1);
});
