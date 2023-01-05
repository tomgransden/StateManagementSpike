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

export const getPublicRecipes = (url: string): Promise<PublicRecipeSearchResult[]> => {
  // if (Math.random() > 0.5) {
  //   return Promise.reject('Mock error');
  // }
  return axios
    .get<GetAllRecipesResult>(
      url,
    )
    .then(res => res.data.data);
};

export const getPublicRecipeDetail = (
  slug: string,
): Promise<PublicRecipeDetailed> => {
  // if (Math.random() > 0.5) {
  //   return Promise.reject('Mock error');
  // }
  return axios
    .get<IndividualRecipeResult>(
      `https://content.slimmingworld.co.uk/api/v2/public-${slug.substring(1)}`,
    )
    .then(res => res.data.data);
};
