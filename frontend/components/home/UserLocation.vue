<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { LOCATION_API_URL } from '~/constants/url';
import type { UserLocation } from '../../../common/types/location';

const locationStore = useLocationStore();

navigator.geolocation.getCurrentPosition(

// if user allowed to get GEO, do this:
    async position => {
            try {
                const { data } = await useFetch(
                    // free api, 30 request per day
                    "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+ 
                    position.coords.latitude +
                    "&longitude=" +
                    position.coords.longitude,
                    {
                        lazy: true,
                        server: false,
                        transform: (data: {
                            city: string; countryCode: string; countryName: string
                        }): UserLocation => {
                            return {
                                code: data.countryCode,
                                city: data.city,
                                country: data.countryName
                            };
                        }
                    }
                )
                if (!data.value) return;
                locationStore.userLocation = data.value
            } catch (error: any) {
                console.log("error: ", error.message);
            } 
    },

// if user not allowed to get his GEO
    async error => {
        if(error.message == 'User denied Geolocation'){
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
            if (!data.value) return;
            locationStore.userLocation = data.value
        }
    }
)

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
