import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se é exibida na tela a mensagem caso a pessoa não tenha Pokémon favorito', () => {
  renderWithRouter(<App />, { route: '/favorites' });

  const text = screen.getByText(/No favorite Pokémon found/i);

  expect(text).toBeInTheDocument();
});

test('Testa se é exibida na tela os pokémons favoritados', async () => {
  renderWithRouter(<App />, { route: '/' });

  const moreDetails = screen.getByRole('link', { name: /More details/i });

  const favorite = screen.getByRole('link', { name: /favorite pokémon/i });

  await userEvent.click(moreDetails);

  const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

  await userEvent.click(checkbox);
  await userEvent.click(favorite);

  const Text = screen.getByText(/pikachu/i);
  expect(Text).toBeInTheDocument();
});
