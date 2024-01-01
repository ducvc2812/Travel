import { api } from '../api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: `/auth/login`,
        method: 'POST',
        body : payload
      }),
    }),
    getMe: builder.query({
        query: () => ({
            url: `/products`,
            method: 'GET',
        }),
        }),
  }),
});

export const { 
    useLoginMutation, 
    useGetMeQuery
 } = userApi;
