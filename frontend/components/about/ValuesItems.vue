<script setup lang="ts">

    import type { values } from '.';
    const props = defineProps<values>();

</script>


<template>
    <li class="ValuesItem__list">
        <img :src="imageUrl" alt="openness">
        <p class="ValuesItem__text"> {{ $t(title) }}</p>
    </li>
   
</template>


<style lang="less" scoped>
.ValuesItem {

    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    
	&__text {
		font-size: var(--font-size-S);
        width: 305px;
        margin-top: 10px;
       
	}
}
</style>