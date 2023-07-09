<script setup lang="ts">
import {
	countriesInfoTexts,
	countriesNames,
	getCitiesNamesByCountry
} from '../../../../common/texts/place-info/index';

const route = useRoute();
const router = useRouter();

const country = route.params.country;

if (!country || !countriesNames.includes(country)) {
	router.push({ name: 'place-info' });
}
</script>

<template>
	<div class="country-block">
		<h1>{{ country }}</h1>
		<section>
			<h2>О стране</h2>
			<p class="country-info-text">
				{{ countriesInfoTexts[country].text }}
			</p>
		</section>

		<section>
			<h2>Куда сходить в {{ country }}</h2>
			<NuxtLink :to="`/?country=${country}`"
				>Вот что есть в Афише по {{ country }} --></NuxtLink
			>
		</section>

		<section>
			<h2>О городах</h2>
			<ul>
				<li
					v-for="city in getCitiesNamesByCountry(country)"
					:key="city"
				>
					<NuxtLink :to="`/place-info/${country}/${city}`">{{ city }}</NuxtLink>
				</li>
			</ul>
		</section>
	</div>
</template>

<style lang="less" scoped>
.country-block {
	padding-top: 16px;
	padding-bottom: 16px;
	display: flex;
	gap: 16px;
	flex-direction: column;
}

.country-info-text {
	white-space: pre-wrap;
}
</style>
