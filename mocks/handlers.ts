import {rest} from 'msw';
import mockRecipeDetail from './mockRecipeDetail';
import mockSearchResults from './mockSearchResults';

export const handlers = [
  // Handles a POST /login request
  rest.get(
    'https://content.slimmingworld.co.uk/api/v2/public-recipes/search',
    (req, res, ctx) => {
      return res(ctx.json(mockSearchResults));
    },
  ),
  rest.get(
    'https://content.slimmingworld.co.uk/api/v2/public-recipes/:recipeId',
    (req, res, ctx) => {
      return res(ctx.json(mockRecipeDetail));
    },
  ),
];
