<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';

const locationStore = useLocationStore();
locationStore.getUserLocation();
</script>

<template>
	<div
		class="user-location__container"
		:aria-label="$t('home.location.aria')"
	>
		<CommonIcon
			class="user-location__pin"
			color="var(--color-white)"
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

	&__pin {
		margin-right: 8px;
	}

	&__text {
		font-size: var(--font-size-M);
		color: var(--color-white);
	}
}
</style>
