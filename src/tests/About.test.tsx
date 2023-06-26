import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Testa se renderiza h2 com o text About Pokédex ', () => {
  renderWithRouter(<About />, { route: '/About' });

  const h1 = screen.getByText(/About Pokédex/i);

  expect(h1).toBeInTheDocument();
});

test('Testa se renderiza os dois paragrafos', () => {
  renderWithRouter(<About />, { route: '/About' });

  const paragraphOne = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);

  const paragraphTwo = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);

  expect(paragraphOne).toBeInTheDocument();
  expect(paragraphTwo).toBeInTheDocument();
});

test('Testa se renderiza a imagem', () => {
  renderWithRouter(<About />, { route: '/About' });

  const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  const pokedexImage = screen.getByRole('img', { name: /Pokédex/i });

  expect(pokedexImage).toHaveAttribute('src', img);
});
