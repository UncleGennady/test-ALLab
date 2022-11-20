import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//process.env.REACT_APP_API_URL//process.env.REACT_APP_TOKEN
export const jobApi = createApi({
    reducerPath:"jobApi",
    baseQuery:fetchBaseQuery({baseUrl:process.env.REACT_APP_API_URL}),
    endpoints: (builder) => ({
        getJob: builder.query({
            query: (limit) =>({
                url: `data?_limit=${limit}`,
                headers:{
                    'authorization': process.env.REACT_APP_TOKEN
                },
            })
        }),
    }),

})

export const{ useGetJobQuery } = jobApi;