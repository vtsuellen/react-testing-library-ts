import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se é renderizado um card com as informações de determinado Pokémon', async () => {
  renderWithRouter(<App />, { route: '/' });

  const type = screen.getByTestId('pokemon-type');
  const normalBtn = screen.getByRole('button', { name: /Normal/i });

  await userEvent.click(normalBtn);

  expect(screen.getByText(/Snorlax/i)).toBeInTheDocument();
  expect(type).toHaveTextContent(/Normal/i);

  const averageWeigth = screen.getByText(/Average weight: 460.0 kg/i);
  expect(averageWeigth).toBeInTheDocument();

  const alt = screen.getByRole('img', { name: /Snorlax sprite/i });
  const img = 'https://archives.bulbagarden.net/media/upload/4/40/Spr_5b_143.png';

  expect(alt).toHaveAttribute('src', img);
});

test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', async () => {
  renderWithRouter(<App />, { route: '/' });

  const normalBtn = screen.getByRole('button', { name: /Normal/i });
  await userEvent.click(normalBtn);

  const moreDetails = screen.getByRole('link', { name: /More details/i });
  expect(moreDetails).toBeInTheDocument();
  expect(moreDetails).toHaveAttribute('href', '/pokemon/143');
  await userEvent.click(moreDetails);
  expect(moreDetails).toHaveAttribute('href', '/pokemon/143');
});

test('Testa se existe um ícone de estrela nos Pokémon favoritados:', async () => {
  renderWithRouter(<App />, { route: '/' });

  const normalBtn = screen.getByRole('button', { name: /Normal/i });
  await userEvent.click(normalBtn);

  const moreDetails = screen.getByRole('link', { name: /More details/i });
  await userEvent.click(moreDetails);

  const Favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
  await userEvent.click(Favorite);

  const alt = screen.getByRole('img', { name: /Snorlax is marked as favorite/i });
  const src = '/star-icon.svg';
  expect(alt).toBeInTheDocument();
  expect(alt).toHaveAttribute('src', src);
});
