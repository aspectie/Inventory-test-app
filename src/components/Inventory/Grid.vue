<template>
    <div class="grid" @dragover.prevent @dragenter.prevent>
        <Cell v-for="item in filteredItems" v-bind="item" :key="item.id" :draggable="item.isDraggable"
            @drop="onItemDrop($event, item.id)" @dragstart="onItemDragStart($event, item)"
            @click="onItemClick($event, item)"/>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Cell from './Cell.vue'
import { v4 as uuid } from 'uuid'
import { useInventoryStore } from '@stores/inventoryStore';

const props = defineProps({
    size: {
        type: Number,
        required: true
    }
})

const items = ref([]);
const storeItems = ref([]);

const inventoryStore = useInventoryStore();

inventoryStore.getInventoryItems().then(() => {
    storeItems.value = inventoryStore.items;
});

inventoryStore.$onAction(({ store,  after }) => {
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

function onItemClick(event, item) {
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
        return 0
    });
}

function fillGridWithEmptyCells() {
    for (let i = 0; i < props.size; i++) {
        let randomId = uuid();

        items.value.push({ isEmpty: true, id: randomId, position: i + 1, isDraggable: false});
    }
}

function updateGridWithNewItems() {
    items.value = [];
    fillGridWithEmptyCells();
    for (let i = 0; i < props.size; i++) {
        for (let item of storeItems.value) {
            if (item.position === items.value[i].position) {
                items.value[i] = {...item, isDraggable: true};
            }
        }
    }
}

function onItemDragStart(event, item) {
    const isEmpty = item.isEmpty;

    if (isEmpty) {
        return;
    }

    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('droppingId', item.id);
}

function onItemDrop(event, droppedId) {
    if (event.dataTransfer.getData('droppingId') === '') {
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

function getPositionById(id) {
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