import axios from 'axios';

import {
  PublicRecipeDetailed,
  PublicRecipeSearchResult,
} from '../types/publicRecipeTypes';

type GetAllRecipesResult = {
  data: PublicRecipeSearchResult[];
};

type IndividualRecipeResult = {
  data: PublicRecipeDetailed;
};

export const getPublicRecipes = (): Promise<PublicRecipeSearchResult[]> => {
  if (Math.random() > 0.7) {
    return null;
  }
  return axios
    .get<GetAllRecipesResult>(
      'https://content.slimmingworld.co.uk/api/v2/public-recipes/search?limit=12&offset=0',
    )
    .then(res => res.data.data);
};
export const getPublicRecipeDetail = (
  slug: string,
): Promise<PublicRecipeDetailed> => {
  if (Math.random() > 0.7) {
    console.log(
      ' %c mocking error',
      'color: black; background: #32CD32 ; font-size:1.2rem',
    );
    return null;
  }
  console.log(
    ' %c about to fetch recepie data',
    'color: black; background: #32CD32 ; font-size:1.2rem',
  );
  return axios
    .get<IndividualRecipeResult>(
      `https://content.slimmingworld.co.uk/api/v2/public-${slug.substring(1)}`,
    )
    .then(res => res.data.data);
};
