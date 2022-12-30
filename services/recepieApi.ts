import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const rececepieApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://content.slimmingworld.co.uk/api/v2/public-recipes',
  }),
  tagTypes: [],
  endpoints: builder => ({
    getRecepieList: builder.query({
      query: (slug: string) => `${slug}`,
    }),
    getRecepieDetail: builder.query({
      query: (slug: string) => `${slug.split('/')[2]}`,
    }),
  }),
});
// useGetRecepieDetailQuery, useGetRecepieListQuery  these 2 are auto generated from the endpoints above
export const {useGetRecepieDetailQuery, useGetRecepieListQuery} = rececepieApi;
