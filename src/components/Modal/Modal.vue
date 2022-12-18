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
    padding: 18px 14px;
    background-color: #262626;
    border: 1px solid #4D4D4D;
    min-width: 150px;
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
        right: 14px;
        top: 14px;
    }

    &__header {
        padding: 45px;
        border-bottom: 1px solid #4D4D4D;
    }    

    &__body {
        border-bottom: 1px solid #4D4D4D;
        
    }    

    &__footer {
        
    }
}

</style>