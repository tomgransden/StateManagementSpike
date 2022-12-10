import axios from 'axios';
import {QueryFunctionContext} from '@tanstack/react-query';
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

export const getPublicRecipes = (): Promise<PublicRecipeSearchResult[]> =>
  axios
    .get<GetAllRecipesResult>(
      'https://content.slimmingworld.co.uk/api/v2/public-recipes/search?limit=12&offset=0',
    )
    .then(res => res.data.data);

export const getPublicRecipeDetail = ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<PublicRecipeDetailed> => {
  const [, slug] = queryKey;

  return axios
    .get<IndividualRecipeResult>(
      `https://content.slimmingworld.co.uk/api/v2/public-${slug.substring(1)}`,
    )
    .then(res => res.data.data);
};
