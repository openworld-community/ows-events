<script setup lang="ts">

import { values } from './AboutData';

</script>

<template> 
    <ul class="list">
        <AboutValuesItems
            v-for="item in values"
            v-bind="item"
            :key="item.key"
        />
    </ul>   
</template>

<style lang="less" scoped>
.list {
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
</style>