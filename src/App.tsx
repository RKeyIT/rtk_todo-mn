import React, {useState} from 'react';
import {useCreateItemMutation, useDeleteItemMutation, useGetItemsQuery, useUpdateItemMutation} from "./store";

interface ProductItem {
    id: number;
    name: string;
}

const App = () => {
    const [limit, setLimit] = useState('')
    const [newItem, setNewItem] = useState('')
    const {data = [], isLoading: fetchLoading, isError: fetchError} = useGetItemsQuery(limit);
    const [createItem, {}] = useCreateItemMutation();
    const [updateItem, {}] = useUpdateItemMutation()
    const [deleteItem, {}] = useDeleteItemMutation()

    const createItemHandler = async () => {
        if(newItem){
            await createItem({name: newItem}).unwrap()
            setNewItem('')
        }
    }

    const deleteItemHandler = async (id: number) => {
        await deleteItem(id).unwrap()
    }

    return (
        <>
            {fetchLoading && <h1>Loading...</h1>}
            {fetchError && <h1>ERROR OCCURRED</h1>}
            {!fetchLoading && !fetchError &&
                <div>
                    <input
                        type='text'
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                    />
                    <button onClick={createItemHandler}>New Item</button>
                    <select value={limit} onChange={e => setLimit(e.target.value)}>
                        <option value=''>All</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                    </select>
                    <ul>
                        {data.map((item: ProductItem) => <li onClick={() => deleteItemHandler(item.id)} key={item.id}>{item.name}</li>)}
                    </ul>
                </div>
            }
        </>
    );
};

export default App;