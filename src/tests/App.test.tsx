import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Testa se renderiza home na pagina inicial', () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

test('Testa se Home é um link navegavel', () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home/i)).toBeInTheDocument();

  const homeLink = screen.getByRole('link', { name: /Home/i });

  userEvent.click(homeLink);

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

test('Testa se renderiza About na pagina inicial', () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/About/i)).toBeInTheDocument();
});

test('Testa se about é um link navegavel', () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/About/i)).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', { name: /About/i });

  userEvent.click(aboutLink);

  expect(screen.getByText(/About/i)).toBeInTheDocument();
});

test('Testa se renderiza Favorite Pokémon na pagina inicial', () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Favorite Pokémon/i)).toBeInTheDocument();
});

test('Testa se About é um link navegavel', () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Favorite Pokémon/i)).toBeInTheDocument();

  const favoritePokémonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });

  userEvent.click(favoritePokémonLink);

  expect(screen.getByText(/Favorite Pokémon/i)).toBeInTheDocument();
});
