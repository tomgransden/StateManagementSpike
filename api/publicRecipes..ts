import axios, {AxiosResponse} from 'axios';

type PublicRecipeImage = {
  src: string;
  alt: string;
  focalPoint: null;
  caption: string;
  _type: string;
  id: string;
};

type PublicRecipeSearchResult = {
  image: PublicRecipeImage;
  characteristics: number;
  palette: string;
  servings: number;
  servingType: string;
  syns: number;
  totalTime: number;
  isFoodRange: boolean;
  foodRangeCategoryId: number;
  recipeDbId: string;
  introduction: string | null;
  id: string;
  link: string;
  title: string;
  _type: string;
};

type GetAllRecipesResult = {
  data: PublicRecipeSearchResult[];
};

export const getPublicRecipes = () =>
  axios
    .get(
      'https://content.slimmingworld.co.uk/api/v2/public-recipes/search?limit=12&offset=0',
    )
    .then(res => res.data.data);

export const getPublicRecipeDetail = (slug: string) =>
  axios
    .get(
      `https://content.slimmingworld.co.uk/api/v2/public-${slug.substring(1)}`,
    )
    .then(res => res.data.data);
