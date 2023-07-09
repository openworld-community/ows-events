<script setup lang="ts">
import {
	countriesNames,
	getCitiesNamesByCountry,
	getCityInfoText
} from '../../../../common/texts/place-info/index';

const route = useRoute();
const router = useRouter();

const country = route.params.country;

if (!country || !countriesNames.includes(country)) {
	router.push({ name: 'place-info' });
}

const city = route.params.city as string;

if (!city || !getCitiesNamesByCountry(country).includes(city)) {
	router.push({ name: `place-info/${country}` });
}
</script>

<template>
	<div class="city-block">
		<h1>{{ city }}, {{ country }}</h1>
		<section class="city-info-block">
			<h2>О городе</h2>
			<p class="city-info-text">
				{{ getCityInfoText(country, city) }}
			</p>
		</section>

		<section>
			<h2>Куда сходить в {{ city }}</h2>
			<NuxtLink :to="`/?country=${country}&city=${city}`"
				>Вот что есть в Афише по {{ city }} в {{ country }} --></NuxtLink
			>
		</section>

		<section>
			<h2>Узнать про {{ country }}</h2>
			<NuxtLink :to="`/place-info/${country}`">{{ country }}</NuxtLink>
		</section>

		<section class="also-links-block">
			<h2>Узнать про другие города в {{ country }}</h2>
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
.city-block {
	padding-top: 16px;
	padding-bottom: 16px;
	display: flex;
	gap: 16px;
	flex-direction: column;
}

.city-info-text {
	white-space: pre-wrap;
}
</style>
