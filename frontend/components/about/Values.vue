<script setup lang="ts">

defineProps({
	imageUrl: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		defualt: ''
	},
});


</script>

<template>
    
    <div>
        <!--
        <ul>
            <AboutValuesItems 
                v-for = "item in advantage"
                v-bind = "item"
                :key = "item.title"
                class = "Values__item"
            />
        </ul>
        -->
        
        <img :src="imageUrl" alt="openness">
        <p> {{ title }}</p>
        


    </div>
    
</template>

<style>


</style>