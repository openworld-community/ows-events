<script setup>
import { SeoItempropEventEnum } from '../../../constants/enums/seo';
defineProps({
	organizer: {
		type: String,
		default: ''
	}
});
</script>
<template>
	<p
		class="event-author text3"
		:itemprop="SeoItempropEventEnum.ORGANIZER"
	>
		{{ organizer }}
	</p>
</template>

<style lang="less" scoped>
.event-author {
	word-wrap: break-word;
	font-weight: var(--font-weight-bold);
	text-align: left;
	color: var(--color-text-secondary);
	margin-bottom: 12px;

	@media (min-width: 768px) {
		margin-bottom: 0;
		margin-top: 10px;
	}
}
</style>
