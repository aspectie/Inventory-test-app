<template>
    <div class="inventory">
        <div class="inventory__sidebar">
            <div class="sidebar-image">
                <img src="@images/AvatarGhost.png" alt="">
            </div>
        </div>

        <div class="inventory__items">
            <Grid :size="25" :data="items" @openModal="onOpenModal"/>
            <Transition name="slide">
                <Modal :isOpened="isOpenedModal" @closeModal="onCloseModal" v-if="isOpenedModal">
                    <template v-slot:header>
                        <Icon :name="itemIcon"/>
                    </template>
                    <template v-slot:body>
                        body
                    </template>
                    <template v-slot:footer>
                        footer
                    </template>
                </Modal>
            </Transition>
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
import Modal from '@components/Modal/Modal.vue'
import Icon from '@components/Icon/Icon.vue'

const inventoryStore = useInventoryStore();
const items = ref([]);
const isOpenedModal = ref(false);
const itemIcon = ref('');

inventoryStore.getInventoryItems().then(() => {
    items.value = inventoryStore.items
})

function onOpenModal(item) {
    if (item.isEmpty) {
        return;
    }

    if (isOpenedModal.value) {
        isOpenedModal.value = false;
    } else {
        isOpenedModal.value = true;
    }

    itemIcon.value = item.icon;
}

function onCloseModal() {
    isOpenedModal.value = false;
}

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
        position: relative;
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

.slide-enter-active,
.slide-leave-active {
    transform: translateX(0);
    transition: all 0.2s ease-in;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease-out;
}
</style>