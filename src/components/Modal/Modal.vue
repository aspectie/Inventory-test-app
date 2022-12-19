<template>
    <div :class="classNames">
        <div class="modal__close" @click="onCloseModal">
            <Icon name="Close"/>
        </div>
        <div class="modal__header">
            <slot name="header"></slot>
        </div>
        <div class="modal__body">
            <slot name="body"></slot>
        </div>
        <div class="modal__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref} from 'vue';
import Icon from '@components/Icon/Icon.vue'

const props = defineProps({
    isOpened: {
        type: Boolean,
        default: false
    }
})

const isOpenedModal = ref(props.isOpened);

watch(() => props.isOpened, () => {
    isOpenedModal.value = props.isOpened;
})

const emit = defineEmits(['closeModal']);

function onCloseModal() {
    emit('closeModal');
}

const classNames = computed(() => ({
    'modal': true,
    'modal--visible': isOpenedModal.value
}))

</script>

<style lang="scss">
.modal {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: $spacing-m $spacing-xs;
    background-color: $color-secondary-background;
    border: 1px solid $color-primary-border;
    min-width: 150px;
    width: 30%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    visibility: hidden;

    &--visible {
        visibility: visible;
    }

    &__close {
        position: absolute;
        right: $spacing-xs;
        top: $spacing-xs;
        cursor: pointer;
        &:hover{
            svg > path {
                fill: $color-primary-red
            }
        }
    }

    &__header {
        padding: 45px;
        border-bottom: 1px solid $color-primary-border;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__body {
        border-bottom: 1px solid $color-primary-border;
        height: 100%;
        padding: $spacing-l;
        color: $color-primary-border;
    }

    &__footer {
        padding: $spacing-l 0;
    }
}

</style>