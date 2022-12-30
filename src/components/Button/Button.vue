<template>
    <button :class="classNames"> {{ title }} </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    title: {
        type: String
    },
    type: {
        type: String,
        default: 'default',
        validator: (s: string) => ['default', 'destructive'].indexOf(s) > -1
    },
    variant: {
        type: String,
        default: 'solid',
        validator: (s: string) => ['solid'].indexOf(s) > -1
    },

});

const classNames = computed(() => ({
    'button': true,
    [`button--${props.type}`]: true,
    [`button--${props.variant}`]: true
}))

</script>

<style lang="scss">
.button {
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    font-family: 'SF';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    &--destructive {
        background-color: $color-primary-red;
    }
    &--solid {
        color: $color-primary-white;
        border: 0;
    }
    &--default {
        background-color: $color-primary-white;
        color: $color-primary-black;
    }
}

</style>