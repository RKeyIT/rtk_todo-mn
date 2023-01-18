import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const goodsApi = createApi({
    reducerPath: 'goodsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
    }),
    endpoints: build => ({
        // C.R.U.D. - Create, Read, Update, Delete
        getItems: build.query({
            query: (item) => ({
                url: 'goods',
            })
        }),
        createItem: build.mutation({
            query: (item) => ({
                url: 'goods',
                method: 'POST',
            })
        }),
        updateItem: build.mutation({
            query: (item) => ({
                url: 'goods',
                method: 'PUT',
            })
        }),
        deleteItem: build.mutation({
            query: (item) => ({
                url: 'goods',
                method: 'DELETE',
            })
        }),
    })
})

export const {useGetItemsQuery} = goodsApi;