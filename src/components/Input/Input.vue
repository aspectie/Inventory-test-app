<template>
    <input :class="classNames" :type="props.type" :name="props.name" :value="props.value" :placeholder="props.placeholder"/>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    type: {
        type: String,
        default: 'text',
        required: true
    },
    name: {
        type: String,
        default: 'text'
    },
    value: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    variant: {
        type: String,
        default: 'solid',
        validator: (s) => ['solid', 'outlined'].indexOf(s) > -1
    },
});

const classNames = computed(() => ({
    'input': true,
    [`input--${props.variant}`]: true
}))

</script>

<style lang="scss">


.input {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: $spacing-m;
    display: flex;
    align-items: center;
    text-align: center;
    color: $color-primary-white;
    opacity: 0.4;
    text-align: start;
    padding: $spacing-xxs;
    outline: none;
    &--outlined {
        background-color: $color-secondary-background;
        border: 1px solid $color-primary-border;
        border-radius: 4px;
    }
}

</style>