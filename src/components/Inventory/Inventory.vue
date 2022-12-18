<template>
    <div class="inventory">
        <div class="inventory__sidebar">
            <div class="sidebar-image">
                <img src="@images/AvatarGhost.png" alt="">
            </div>
        </div>

        <div class="inventory__items">
            <Grid :size="25" :data="items" />
        </div>
       
        <div class="inventory__footer">
            ghost
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { useInventoryStore } from '@stores/inventoryStore.js'
import Grid from './Grid.vue'

const inventoryStore = useInventoryStore()
const items = ref([])

inventoryStore.getInventoryItems().then(() => {
    items.value = inventoryStore.items
})


</script>

<style lang="scss">
.inventory {
    background-color: black;
    padding: 32px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    overflow-y: auto;

    img, svg {
        width: 100%;
        display: block;
    }

    &__sidebar {
        width: 30%;
        padding: 18px 14px;
    }

    &__items {
        width: calc(70% - 24px);
        color: wheat;
        margin-left: 24px;
    }

    &__footer {
        width: 100%;
        margin-top: 24px;
        padding: 18px;
    }

    &__sidebar,
    &__items,
    &__footer {
        background-color: #262626;
        border: 1px solid #4D4D4D;
        border-radius: 12px;
    }
}
</style>