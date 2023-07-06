<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { LOCATION_API_URL } from '~/constants/url';
import type { UserLocation } from '../../../common/types/location';

const locationStore = useLocationStore();
// fyi - doesn't work locally cause your IP is just localhost or smth. Works remotely, I promise
const { data } = await useFetch(
	process.server ? useRequestHeaders()['x-forwarded-for'] : LOCATION_API_URL,
	{
		query: {
			key: import.meta.env.VITE_IPREGISTRY_API_KEY ?? process.env.VITE_IPREGISTRY_API_KEY
		},
		baseURL: LOCATION_API_URL,
		transform: (data: {
			location: { city: string; country: { code: string; name: string } };
		}): UserLocation => {
			return {
				code: data.location.country.code,
				city: data.location.city,
				country: data.location.country.name
			};
		}
	}
);

watch(data, () => {
	if (!data.value) return;
	locationStore.userLocation = data.value;
});
locationStore.userLocation = data.value ?? locationStore.userLocation;
</script>

<template>
	<div
		class="user-location__container"
		:aria-label="$t('home.location.aria')"
	>
		<CommonIcon
			class="user-location__pin"
			name="map-pin"
		/>
		<p
			v-if="locationStore.userLocation?.city"
			class="user-location__text"
		>
			{{ locationStore.userLocation?.country }}, {{ locationStore.userLocation?.city }}
		</p>
		<p
			v-else-if="locationStore.userLocation?.country"
			class="user-location__text"
		>
			{{ locationStore.userLocation.country }}
		</p>
		<p
			v-else
			class="user-location__text"
		>
			{{ $t('home.user_location.not_found') }}
		</p>
	</div>
</template>

<style lang="less" scoped>
.user-location {
	&__container {
		display: flex;
	}

	&__pin {
		color: var(--color-accent-green-main);
		margin-right: 13px;
	}

	&__text {
		font-size: var(--font-size-XS);
	}
}
</style>
