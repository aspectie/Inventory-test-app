<template>
    <input :type="props.type" :name="props.name" :value="props.value" :placeholder="props.placeholder"/>
</template>

<script setup>
import {ref, computed, watch} from "vue";

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
    }
});


</script>