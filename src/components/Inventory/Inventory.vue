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
                        <Button title="Remove item" type="destructive" v-if="isShowRemoveButton" @click="onClickItemRemove"/>
                        <div v-else>
                            <Input class="action-input" type="text" name="itemsCount" placeholder="Put items count" variant="outlined" @input="onInputItemsCount"/>
                            <div class="action-buttons">
                                <Button class="action-buttons__cancel" title="Cancel" type="default" @click="closeModal"/>
                                <Button class="action-buttons__accept" title="Accept" type="destructive" @click="onClickAccept"/>
                            </div>
                        </div>
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
import Button from '@components/Button/Button.vue'
import Input from '@components/Input/Input.vue'

const inventoryStore = useInventoryStore();
const items = ref([]);
const isOpenedModal = ref(false);
const itemIcon = ref('');
const isShowRemoveButton = ref(true);
const itemsCountToRemove = ref(0);
const currentItemToRemove = ref({});

inventoryStore.getInventoryItems().then(() => {
    items.value = inventoryStore.items
})

const unsubscribe = inventoryStore.$onAction(
  ({name, store, args, after, onError}) => {
    if (['removeItem'].includes(name)) {
      after(() => {
        items.value = store.items;
      });
    }
  }
);

function onOpenModal(item) {
    if (item.isEmpty) {
        return;
    }
    currentItemToRemove.value = item;

    showRemoveButton();

    if (isOpenedModal.value) {
        closeModal();
    } else {
        isOpenedModal.value = true;
    }

    itemIcon.value = item.icon;
}

function onCloseModal() {
    closeModal();
}

function closeModal() {
    isOpenedModal.value = false;
}

function showRemoveButton() {
    isShowRemoveButton.value = true;
}

function onClickItemRemove() {
    isShowRemoveButton.value = false;
}

function onInputItemsCount(event) {
    itemsCountToRemove.value = event.target.value;
}

function onClickAccept() {
    inventoryStore.removeItem(currentItemToRemove.value, itemsCountToRemove.value);
    
    const isCurrentItemExists = inventoryStore.getItemById(currentItemToRemove.value.id);

    if (!isCurrentItemExists) {
        closeModal();
        itemsCountToRemove.value = 0;
    }
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
        overflow: hidden;
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

.action-input {
    margin-bottom: 20px;
}

.action-buttons {
    display: flex;
    justify-content: space-between;
    &__cancel {
        width: 40%;
    }
    &__accept {
        width: 55%;
    }
    button {
        box-shadow: 0px 0px 10px #FA7272;
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