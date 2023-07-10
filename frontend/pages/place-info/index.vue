<script setup lang="ts">
import { countriesNames, getCitiesNamesByCountry } from '../../../common/texts/place-info/index';
</script>

<template>
	<ul>
		<li
			v-for="country in countriesNames"
			:key="country"
		>
			<NuxtLink :to="`/place-info/${country}`">{{ country }}</NuxtLink>

			<ul
				v-if="getCitiesNamesByCountry(country)"
				class="cities-list"
			>
				<li
					v-for="city in getCitiesNamesByCountry(country)"
					:key="city"
					class="cities-list__item"
				>
					<NuxtLink :to="`/place-info/${country}/${city}`">{{ city }}</NuxtLink>
				</li>
			</ul>
		</li>
	</ul>
</template>

<style lang="less" scoped>
.cities-list {
	padding-left: 16px;

	.cities-list__item {
		list-style: inside;
	}
}
</style>
