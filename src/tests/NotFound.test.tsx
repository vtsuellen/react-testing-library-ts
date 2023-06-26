import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

test('Testa se renderiza o h2 com o texto', () => {
  renderWithRouter(<NotFound />, { route: '/NotFound' });

  const h2 = screen.getByText(/Page requested not found/i);

  expect(h2).toBeInTheDocument();
});

test('Testa se renderiza a imagem', () => {
  renderWithRouter(<NotFound />, { route: '/NotFoud' });

  const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  const notFoudImage = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

  expect(notFoudImage).toHaveAttribute('src', img);
});
