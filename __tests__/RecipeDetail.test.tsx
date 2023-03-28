import React from 'react';
import {
  render,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/react-native';
import RecipeDetail from '../components/RecipeDetail';
import {rest, server} from '../mocks/server';
import mockRecipeDetail from '../mocks/mockRecipeDetail';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        slug: '/recipes/spaghetti-and-meatballs',
      },
    }),
  };
});

describe('RecipeDetail', () => {
  it('Should render correctly', async () => {
    render(<RecipeDetail />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'A midweek classic… just don’t forget the napkins (it’s seriously slurpable!)',
        ),
      ).toBeVisible();
    });
  });

  it('Should show error state', async () => {
    server.use(
      rest.get(
        'https://content.slimmingworld.co.uk/api/v2/public-recipes/:recipeId',
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({message: 'testErrorMessage'}));
        },
      ),
    );

    render(<RecipeDetail />);

    await waitFor(() => {
      expect(screen.getByText('An error occured. retry?')).toBeVisible();
    });

    server.use(
      rest.get(
        'https://content.slimmingworld.co.uk/api/v2/public-recipes/:recipeId',
        async (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mockRecipeDetail));
        },
      ),
    );

    fireEvent.press(screen.getByText('An error occured. retry?'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'A midweek classic… just don’t forget the napkins (it’s seriously slurpable!)',
        ),
      ).toBeVisible();
    });
  });
});
