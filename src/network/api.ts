import {
    type BaseQueryFn,
    type FetchArgs,
    createApi,
    fetchBaseQuery,
    type FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = getCookie('accessToken');
        headers.set('Authorization', `Bearer ${accessToken}`);
        return headers;
    }
});
const baseQueryWithInterceptor: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error) {
        if (result.error.status === 401) {
            // const refreshToken = getCookie('refreshToken');
            // const refreshResult = await Auth.refreshToken(refreshToken as string);

        //     if (refreshResult.data) {
        //         const newHeaders = {
        //             Authorization: `Bearer ${refreshResult.data?.acceptToken}`
        //         };
        //         setCookie('accessToken', refreshResult.data?.acceptToken);

        //         result = await baseQuery(args, api, {
        //             ...extraOptions,
        //             headers: newHeaders
        //         });
        //     } else {
        //         window.location.href = process.env.NEXT_PUBLIC_ACCOUNT_URL as string;
        //     }
        // } else {
            return result;
        }
    }

    return result;
};
export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    refetchOnFocus: false,
    endpoints: () => ({})
});