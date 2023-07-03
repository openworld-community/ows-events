<script setup lang="ts">
import { type PropType } from 'vue';

defineProps({
	country: {
		type: String as PropType<string>,
		default: '0'
	},
	city: {
		type: String as PropType<string>,
		default: ''
	},
	className: {
		type: String as PropType<string>,
		default: ''
	},
});

</script>

<template>
	<span
			:class="className"
	>
		<span
				itemprop="address"
				itemscope
				itemtype="https://schema.org/PostalAddress"
		>
			<span
					v-if="country"
					itemprop="addressRegion"
			>
				{{ country }},
			</span>
			<span
					v-if="city"
					itemprop="addressLocality"
			>
				{{ city }}
			</span>
		</span>
	</span>
</template>
