<template>
    <div class="item" v-if="isEmpty"></div>
    <div class="item" v-else>
        <div class="item__icon">
            <icon :name="name"/>
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
    name: {
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

    &__count {
        position: absolute;
        bottom: -1px;
        right: -1px;
        padding: 10px;        
        border: 1px solid #4D4D4D;
        font-family: 'SF';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
    }
}

</style>