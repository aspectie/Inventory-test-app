export interface InventoryItem {
    icon: string,
    count: number,
    position: number,
    isEmpty: boolean,
    id: number,
    isDraggable: boolean
}

export interface InventoryStore {
    items: InventoryItem[]
}