<script setup lang="ts">

import { values } from './index';

</script>

<template> 
    <ul class="values__list">
        <AboutValuesItems
            v-bind = "item"
            v-for = "item in values"
            :key = "item.key"
            class = "values__item"
        />
    </ul>   
</template>

<style lang="less" scoped>
.values {
	&__list {
		display: flex;
		flex-direction: column;
		gap: 50px;
  
	}
}
</style>