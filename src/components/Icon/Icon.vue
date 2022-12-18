<template>
    <component :is="iconComponent" />
</template>

<script setup>
import {ref, computed} from "vue";
import { defineAsyncComponent } from "vue";
const props = defineProps({
    name: {
        type: String,
        required: true,
    }
});

const componentRef = ref(null);
defineExpose({ref: componentRef});

const iconComponent = computed(() => defineAsyncComponent(() => {
        return import(`../../assets/icons/${props.name}.vue`);
    })
);

</script>