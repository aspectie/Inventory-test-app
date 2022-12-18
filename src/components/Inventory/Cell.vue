<template>
    <div class="item" v-if="isEmpty"></div>
    <div class="item" v-else>
        <div class="item__icon">
            <icon :name="icon"/>
        </div>
        <div class="item__count">
            {{ props.count }}
        </div>
    </div>
</template>

<script setup>
import Icon from '@components/Icon/Icon.vue'

const props = defineProps({
    isEmpty: {
        type: Boolean,
        default: true
    },
    icon: {
        type: String
    },
    count: {
        type: Number
    },
    position: {
        type: Number,
        required: true
    }
})

</script>

<style lang="scss">

.item {
    width: 20%;
    border: 1px solid #4D4D4D;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 100px;
    padding: 12px;
    cursor: pointer;

    &__count {
        position: absolute;
        bottom: -1px;
        right: -1px;
        padding: 8px;        
        border: 1px solid #4D4D4D;
        font-family: 'SF';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        display: flex;
        align-items: center;
        text-align: center;
        border-top-left-radius: 10px;
        color: #FFFFFF;
        opacity: 0.4;
    }
    &:first-child {
        border-top-left-radius: 11px;
    }
    &:nth-child(5) {
        border-top-right-radius: 11px;
    }
    &:nth-child(21) {
        border-bottom-left-radius: 11px;
    }
    &:nth-child(25) {
        border-bottom-right-radius: 11px;
    }
}

</style>