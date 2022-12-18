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
        }
    }
})
