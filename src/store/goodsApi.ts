import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface queryPreset { id: number, name: string, type: string }

export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    tagTypes: ['goods'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://my-json-server.typicode.com/RKeyIT/simple-json-server/',
        // baseUrl: 'http://localhost:5000/',
    }),
    endpoints: (build) => ({
        // C.R.U.D. - Create, Read, Update, Delete
        getItems: build.query({
            query: (limit: string) => {
                if(!limit){return {url: 'goods'}}
                return {
                    url: `goods`,
                    params: {
                        _limit: limit,
                    }
                }
            },
            providesTags: (result: queryPreset[] | undefined) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'goods' as const, id })),
                        { type: 'goods', id: 'LIST' },
                    ]
                    : [{ type: 'goods', id: 'LIST' }],
        }),
        createItem: build.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'goods', id: 'LIST' }]
        }),
        updateItem: build.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'goods', id: 'LIST' }]
        }),
        deleteItem: build.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'goods', id: 'LIST' }]
        }),
    })
})

export const {useGetItemsQuery, useCreateItemMutation, useUpdateItemMutation, useDeleteItemMutation} = goodsApi;