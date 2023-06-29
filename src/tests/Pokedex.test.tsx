import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import { Pokedex } from '../pages';

// props da pokedex.tsx
const PokedexProps = {
  pokemonList,
  favoritePokemonIdsObj: {},
};

test('Testa se renderiza h2 com o texto Encountered Pokémon', () => {
  render(<Pokedex { ...PokedexProps } />, { wrapper: BrowserRouter });

  const h2 = screen.getByText(/Encountered Pokémon/i);

  expect(h2).toBeInTheDocument();
});

test('Testa se o botão contém o texto Próximo Pokémon', () => {
  render(<Pokedex { ...PokedexProps } />, { wrapper: BrowserRouter });

  const button = screen.getByRole('button', { name: /Próximo Pokémon/i });

  expect(button).toBeInTheDocument();
});

test('Testa se o botão renderiza na ordem certa', async () => {
  const props = { ...PokedexProps, pokemonList: pokemonList.slice(0, 9) };
  render(<Pokedex { ...props } />, { wrapper: BrowserRouter });

  const [pkm1, pkm2, pkm3, pkm4, pkm5, pkm6, pkm7, pkm8, pkm9] = pokemonList;
  const button = screen.getByRole('button', { name: /Próximo Pokémon/i });

  screen.getByText(pkm1.name);
  await userEvent.click(button);

  screen.getByText(pkm2.name);
  await userEvent.click(button);

  screen.getByText(pkm3.name);
  await userEvent.click(button);

  screen.getByText(pkm4.name);
  await userEvent.click(button);

  screen.getByText(pkm5.name);
  await userEvent.click(button);

  screen.getByText(pkm6.name);
  await userEvent.click(button);

  screen.getByText(pkm7.name);
  await userEvent.click(button);

  screen.getByText(pkm8.name);
  await userEvent.click(button);

  screen.getByText(pkm9.name);
  await userEvent.click(button);

  screen.getByText(pkm1.name);
  await userEvent.click(button);
});

test('Testa os buttons', async () => {
  const btn = (text: string) => {
    const regex = new RegExp(text, 'i');
    const button = screen.getByRole('button', { name: regex });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-testid', 'pokemon-type-button');
  };

  render(<Pokedex { ...PokedexProps } />, { wrapper: BrowserRouter });

  btn('Electric');
  btn('Fire');
  btn('Bug');
  btn('Poison');
  btn('Psychic');
  btn('Normal');
  btn('Dragon');
});

test('Testa a funcionalidade dos buttons ', async () => {
  render(<Pokedex { ...PokedexProps } />, { wrapper: BrowserRouter });

  const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
  const btnFire = screen.getByRole('button', { name: /Fire/i });
  const btnAll = screen.getByRole('button', { name: /All/i });

  await userEvent.click(btnFire);
  Pkm('Fire', 0);
  expect(btnAll).toBeInTheDocument();

  await userEvent.click(button);
  Pkm('Fire', 1);
  expect(btnAll).toBeInTheDocument();
});

test('Testa se a Pokédex contém um botão para resetar o filtro:', async () => {
  render(<Pokedex { ...PokedexProps } />, { wrapper: BrowserRouter });
  const [Pokemon] = pokemonList;

  const btnFire = screen.getByRole('button', { name: /Fire/i });
  const btnAll = screen.getByRole('button', { name: /All/i });

  await userEvent.click(btnFire);

  await userEvent.click(btnAll);

  Pkm(Pokemon.type, 0);
});

const Type = (name: string) => {
  const foundpkm = pokemonList.find((pokemon) => pokemon.name === name);
  return foundpkm?.type ?? '';
};

const name = (type: string) => {
  const foundpkmList = pokemonList.filter((pokemon) => pokemon.type === type);
  return foundpkmList;
};

const Pkm = (type: string, index: number) => {
  const found = name(type)[index];
  const pkmType = Type(found.name);
  const regex = new RegExp(found.name, 'i');
  const text = screen.getByText(regex).innerHTML;
  expect(Type(text)).toBe(pkmType);
};
