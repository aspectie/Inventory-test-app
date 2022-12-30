<template>
    <div class="grid" @dragover.prevent @dragenter.prevent>
        <Cell v-for="item in filteredItems" v-bind="item" :key="item.id" :draggable="item.isDraggable"
            @drop="onItemDrop($event, item.id)" @dragstart="onItemDragStart($event, item)"
            @click="onItemClick($event, item)"/>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, Ref } from 'vue'
import Cell from './Cell.vue'
import { v4 as uuid } from 'uuid'
import { useInventoryStore } from '@stores/inventoryStore';
import {InventoryItem, InventoryStore} from '/@/types/Inventory';

const props = defineProps({
    size: {
        type: Number,
        required: true
    }
})

const items: Ref<InventoryItem[]> = ref([]);
const storeItems: Ref<InventoryItem[]> = ref([]);

const inventoryStore = useInventoryStore();

inventoryStore.getInventoryItems().then(() => {
    storeItems.value = inventoryStore.items;
});

inventoryStore.$onAction(({ store, after }: { store: InventoryStore, after: (fn: () => void) => void }) => {
    after(() => {
        storeItems.value = store.items;
    });
});


fillGridWithEmptyCells();

const filteredItems = computed(() => {
    return filterItems()
})

watch(() => storeItems.value, () => {
    updateGridWithNewItems();
}, {
    deep: true
})

const emit = defineEmits(['openModal']);

function onItemClick(event: Event, item: InventoryItem) {
    emit('openModal', item);
}

function filterItems() {
    return items.value.sort(function(prev, next) {
        if (prev.position > next.position) {
            return 1;
        }
        if (prev.position < next.position) {
            return -1;
        }
        return 0;
    });
}

function fillGridWithEmptyCells() {
    for (let i = 0; i < props.size; i++) {
        const randomId: number = uuid();

        items.value.push({ isEmpty: true, id: randomId, position: i + 1, isDraggable: false, icon: '', count: 0});
    }
}

function updateGridWithNewItems() {
    items.value = [];
    fillGridWithEmptyCells();
    for (let i = 0; i < props.size; i++) {
        for (const item of storeItems.value) {
            if (item.position === items.value[i].position) {
                items.value[i] = {...item, isDraggable: true};
            }
        }
    }
}

function onItemDragStart(event: DragEvent, item: InventoryItem) {
    const isEmpty = item.isEmpty;

    if (!event.dataTransfer || isEmpty) {
        return;
    }

    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('droppingId', String(item.id));
}

function onItemDrop(event: DragEvent, droppedId: number) {
    if (!event.dataTransfer || event.dataTransfer.getData('droppingId') === '') {
        return;
    }

    const droppingId = parseInt(event.dataTransfer.getData('droppingId'));
    const droppingPosition = getPositionById(droppingId);
    const droppedPosition = getPositionById(droppedId);

    if (droppingPosition === droppedPosition) {
        return;
    }

    inventoryStore.setPositionById(droppingId, droppedPosition);
}

function getPositionById(id: number) {
    let position = null;

    items.value.map(item => {
        if (item.id === id) {
            position = item.position;
        }
    })
    return position;
}

</script>

<style lang="scss">
.grid {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
}

</style>