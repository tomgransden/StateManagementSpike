import RecipeList from '../components/RecipeList';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import mockSearchResults from '../mocks/mockSearchResults';
import {rest} from 'msw';
import RecipeDetail from '../components/RecipeDetail';
import {server} from '../mocks/server';
import mockRecipeDetail from '../mocks/mockRecipeDetail';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('RecipeList', () => {
  it('Should render the list correctly', async () => {
    render(<RecipeList />);

    await waitFor(() => {
      for (let i = 0; i < mockSearchResults.data.length; i++) {
        expect(screen.getByText(mockSearchResults.data[i].title)).toBeVisible();
      }
    });
  });

  it('Should navigate to detail page', async () => {
    render(<RecipeList />);

    await waitFor(() => {
      expect(screen.getByText('Spaghetti and meatballs')).toBeVisible();
    });

    fireEvent.press(screen.getByText('Spaghetti and meatballs'));

    expect(mockedNavigate).toBeCalledWith('Recipe Detail', {
      slug: '/recipes/spaghetti-and-meatballs',
    });
  });

  it('Should show error page', async () => {
    server.use(
      rest.get(
        'https://content.slimmingworld.co.uk/api/v2/public-recipes/search',
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({message: 'testErrorMessage'}));
        },
      ),
    );

    render(<RecipeList />);

    await waitFor(() => {
      expect(screen.getByText('An error occured. retry?')).toBeVisible();
    });

    server.use(
      rest.get(
        'https://content.slimmingworld.co.uk/api/v2/public-recipes/search',
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mockSearchResults));
        },
      ),
    );

    fireEvent.press(screen.getByText('An error occured. retry?'));

    await waitFor(() => {
      expect(screen.getByText('Spaghetti and meatballs')).toBeVisible();
    });
  });
});
