import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const allElements = screen.getAllByTestId('loginInput');
  expect(allElements).toHaveLength(1);
});
