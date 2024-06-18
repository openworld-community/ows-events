<script setup lang="ts">

    import type { AboutValuesData } from './AboutData';
    defineProps<AboutValuesData>();

</script>


<template>
    <li class="valuesItem">
        <img 
            class="valuesItem__image" 
            :src="imageUrl" 
        >
        <p class="valuesItem__text"> {{ $t(title) }}</p>
    </li>
   
</template>


<style lang="less" scoped>
.valuesItem {

	&__text {
		font-size: var(--font-size-S);
        width: 300px;
        margin-top: 10px;

        @media (min-width: 768px) {
			font-size: var(--font-size-L);
            width: 40vw;  
		} 
	}

    &__image {
        @media (min-width: 440px) {
            width: 40vw;
		}  
    }
}

</style>