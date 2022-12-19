<template>
    <div class="inventory">
        <!-- TODO: create sidebar and footer components -->
        <div class="inventory__sidebar">
            <div class="sidebar">
                <div class="sidebar__image">
                    <img src="@images/AvatarGhost.png" alt="">
                </div>
                <div class="sidebar__body">
                    ghost data
                </div>
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
                        <div class="footer" v-if="isShowRemoveButton">
                            <Button title="Remove item" type="destructive" @click="onClickItemRemove"/>
                        </div>
                        <div class="footer" v-else>
                            <Input class="footer__action-input" type="text" name="itemsCount" placeholder="Put items count" variant="outlined" @input="onInputItemsCount"/>
                            <div class="footer__action-buttons">
                                <Button class="action-buttons__cancel" title="Cancel" type="default" @click="closeModal"/>
                                <Button class="action-buttons__accept" title="Accept" type="destructive" @click="onClickAccept"/>
                            </div>
                        </div>
                    </template>
                </Modal>
            </Transition>
        </div>

        <div class="inventory__footer" v-if="isFooterShown">
            <div class="footer">
                <section class="footer__body">
                    ghost data
                </section>
                <div class="footer__close">
                    <Icon name="Close" @click="onFooterClose"/>
                </div>
            </div>
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
const isFooterShown = ref(true);

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

function onFooterClose() {
    isFooterShown.value = false
}

</script>

<style lang="scss">
.inventory {
    padding: $spacing-xxxl;
    width: 70%;
    margin: 0 auto;
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
        padding: $spacing-m $spacing-xs;
    }

    &__items {
        width: calc(70% - $spacing-xxl);
        color: wheat;
        margin-left: $spacing-xxl;
        position: relative;
        overflow: hidden;
    }

    &__footer {
        width: 100%;
        margin-top: $spacing-xxl;
        padding: $spacing-m;
        position: relative;
    }

    &__sidebar,
    &__items,
    &__footer {
        background-color: $color-secondary-background;
        border: 1px solid $color-primary-border;
        border-radius: 12px;
    }

    .sidebar {
        &__body {
            margin-top: $spacing-l;
            text-align: center;
            color: $color-primary-border;
        }
    }

    .footer {
        color: $color-primary-border;
        &__close {
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
            &:hover{
                svg > path {
                    fill: $color-primary-red
                }
            }
        }
        &__action-input {
            margin-bottom: $spacing-l;
            width: 100%;
        }

        &__action-buttons {
            display: flex;
            justify-content: space-between;
            button {
                box-shadow: 0px 0px 10px $color-primary-red;
            }
        }
    }
    .action-buttons {
        &__cancel {
            width: 40%;
        }
        &__accept {
            width: 55%;
        }
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