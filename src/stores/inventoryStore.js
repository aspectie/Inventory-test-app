import { defineStore } from 'pinia'
import axios from 'axios'

import { inventoryAdapter } from '@api/inventory/inventoryApi.js'

inventoryAdapter()

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        items: []
    }),
    actions: {
        async getInventoryItems() {
            const { data } = await axios.get('/api/inventory/getItems', {})
            this.items = data.items
        },
        removeItem(itemToRemove, count) {
            let item = this.getItemById(itemToRemove.id);

            if (!item || !Number(count) || Number(count) < 0) {
                return;
            }

            if (item.count <= Number(count)) {
                // this.removeItemById(itemToRemove.id);
                this.items = this.items.filter(item => String(item.id) !== String(itemToRemove.id));
            } else {
                item.count = item.count - Number(count);
            }
        },
        getItemById(id) {
            return this.items.filter(item => String(item.id) === String(id))[0];
        },
        removeItemById(id) {
            return this.items = this.items.filter(item => String(item.id) !== String(id));
        }
    }
})
