import axios from 'axios';

export const getPublicRecipes = () =>
  axios
    .get(
      'https://content.slimmingworld.co.uk/api/v2/public-recipes/search?limit=12&offset=0',
    )
    .then(res => res.data.data);

export const getPublicRecipeDetail = slug =>
  axios
    .get(
      `https://content.slimmingworld.co.uk/api/v2/public-${slug.substring(1)}`,
    )
    .then(res => res.data.data);
