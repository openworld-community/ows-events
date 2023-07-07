<script setup lang="ts">
import type { Location } from '../../../common/types/address';

const props = defineProps<{ location: Location; className?: string }>();
</script>

<template>
	<span
		:class="props.className ?? ''"
		itemprop="address"
		itemscope
		itemtype="https://schema.org/PostalAddress"
	>
		<span
			v-if="props.location.country"
			itemprop="addressCountry"
		>
			{{ props.location.country }},
		</span>
		<span
			v-if="props.location.city"
			itemprop="addressLocality"
		>
			{{ props.location.city }}
		</span>
		<span
			v-if="props.location?.address"
			itemprop="location"
			>, {{ props.location.address }}
		</span>
	</span>
</template>
