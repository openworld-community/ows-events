<script setup lang="ts">

import { values } from './index';

</script>

<template> 
    <ul class="values__list">
        <AboutValuesItems
            v-for="item in values"
            v-bind="item"
            :key="item.key"
            class="values__item"
        />
    </ul>   
</template>

<style lang="less" scoped>
.values {
	&__list {
		display: flex;
		flex-direction: column;
        align-items: center;
		gap: 50px;

        @media (min-width: 365px) {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
		}
	}
    
}
</style>