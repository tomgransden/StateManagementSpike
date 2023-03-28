export type PublicRecipeImage = {
  src: string;
  alt: string;
  focalPoint: null;
  caption: string;
  _type: string;
  id: string;
};

export type PublicRecipeSearchResult = {
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

type FreeFood = {
  id: string;
  productName: string;
};

export type PublicRecipeDetailed = {
  _type: string;
  description: string;
  title: string;
  characteristics: number;
  cuisine: number;
  image: PublicRecipeImage;
  ingredients: string[];
  subSections: string[];
  mealType: number;
  method: string[];
  palette: string;
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  seasonal: number;
  servings: number;
  syns: number;
  tip: string;
  related: PublicRecipeSearchResult[];
  isPublic: boolean;
  seo: {
    metaTitle: string;
    metaImage: PublicRecipeImage;
    metaDescription: string;
    metaKeywords: null;
    _type: string;
  };
  isFoodRange: boolean;
  foodRangeCategoryId: number;
  synsType: string;
  healthyExtras: string[];
  freeFoods: FreeFood[];
  videoFeature: number;
  videoDescription: string;
  privateVideoId: number;
  publicVideoId: number;
  contentGroup: number;
  recipeId: string;
  additionalTimeInMinutes: number;
  additionalTimeSuffix: string;
  id: string;
  slug: string;
};
