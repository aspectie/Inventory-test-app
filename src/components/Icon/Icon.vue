<template>
    <component :is="iconComponent" />
</template>

<script setup>
import {ref, computed, watch} from "vue";
import { defineAsyncComponent } from "vue";
const props = defineProps({
    name: {
        type: String,
        required: true,
    }
});

const iconName = ref(props.name);

watch(() => props.name, () => {
    iconName.value = props.name;
})

const iconComponent = computed(() => defineAsyncComponent(() => {
        return import(`../../assets/icons/${iconName.value}.vue`);
    })
);

</script>