<script setup lang="ts">
import type {Address} from '../../../common/types/address';

const props = defineProps<{ location: Address, className?: string }>();

</script>

<template>
	<span
			:class="props.className ?? ''"
	>
		<span
				itemprop="address"
				itemscope
				itemtype="https://schema.org/PostalAddress"
		>
			<span
					v-if="props.location?.country"
					itemprop="addressRegion"
			>
				{{ props.location.country }},
			</span>
			<span
					v-if="props.location?.city"
					itemprop="addressLocality"
			>
				{{ props.location.city }}
			</span>
		</span>
	</span>
</template>
