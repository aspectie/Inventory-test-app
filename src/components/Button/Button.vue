<template>
    <button> {{ title }} </button>
</template>

<script setup>
import {ref, computed, watch} from "vue";

const props = defineProps({
    title: {
        type: String
    }
});



</script>