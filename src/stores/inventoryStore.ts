import { defineStore } from 'pinia'
import axios from 'axios'
import { Ref, ref, watch } from 'vue'

import { inventoryAdapter } from '@api/inventory/inventoryApi.js'

inventoryAdapter()

interface item {
    icon: string,
    count: number,
    position: number,
    isEmpty: boolean,
    id: number
}

export const useInventoryStore = defineStore('inventory', () => {
    const items: Ref<item[]> = ref([]);

    const getInventoryItems = async() => {
        try {
            const { data } = await axios.get('/api/inventory/getItems', {})
            const localStorageItems = localStorage.getItem('items');

            if (localStorageItems) {
                items.value = JSON.parse(localStorageItems)._value;
            } else {
                items.value = data.items;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeItem = (itemToRemove: item, count: number) => {
        const item = getItemById(itemToRemove.id);

        if (!item || !Number(count) || Number(count) < 0) {
            return;
        }

        if (item.count <= Number(count)) {
            removeItemById(itemToRemove.id);
        } else {
            item.count = item.count - Number(count);
        }
    }

    const getItemById = (id: number) => {
        return items.value.filter(item => String(item.id) === String(id))[0];
    }

    const removeItemById = (id: number) => {
        return items.value = items.value.filter(item => String(item.id) !== String(id));
    }

    const setPositionById = (id: number, position: number) => {
        const item = getItemById(id);

        item.position = position;
    }

    watch(() => items, (state) => {
        localStorage.setItem('items', JSON.stringify(state))
    }, {
        deep: true
    })

    return {
        items,
        getInventoryItems,
        removeItem,
        getItemById,
        removeItemById,
        setPositionById
    }
})