<script setup lang="ts">
import type { PropType } from 'vue';
import type { EventOnPoster } from '../../../common/types';
import { PEREDELANO_CREATOR_ID } from '../../../common/const/eventTypes';

const mobile = inject<boolean>('mobile');

defineProps({
	posterEvent: {
		type: Object as PropType<EventOnPoster>,
		default: null
	}
});
</script>
<template>
	<div class="description">
		<div class="description__content">
			<h4
				v-if="!mobile && posterEvent.creatorId !== PEREDELANO_CREATOR_ID"
				class="description__title"
			>
				{{ $t('event.description_title') }}
			</h4>
			<p
				v-if="posterEvent.creatorId !== PEREDELANO_CREATOR_ID"
				class="description__text text3"
			>
				{{ posterEvent.description }}
			</p>
			<div
				v-if="posterEvent.creatorId === PEREDELANO_CREATOR_ID"
				class="description__html"
				v-html="useSanitizer(posterEvent.description)"
			/>
		</div>
		<DetailesInfoPoster v-if="!mobile" />
	</div>
</template>
<style lang="less" scoped>
.description {
	display: flex;
	width: 100%;
	margin-bottom: 30px;

	@media (min-width: 768px) {
		gap: 20px;
	}
	&__content {
		padding-top: 22px;
		flex-grow: 1;

		@media (max-width: 768px) {
			margin-bottom: 24px;
		}
		@media (min-width: 768px) {
			border-top: 1px solid var(--color-input-field);
		}
	}
	&__title {
		padding-bottom: 30px;
		@media (min-width: 768px) {
			display: flex;
		}
	}

	&__text {
		word-wrap: break-word;
		white-space: pre-line;
	}

	&__html {
		word-wrap: break-word;
		white-space: pre-line;
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: 24px;
		padding-top: 8px;

		&:deep(h1),
		&:deep(h2),
		&:deep(h3),
		&:deep(h4),
		&:deep(h5) {
			line-height: normal;
			font-size: var(--font-size-S);
		}

		&:deep(h2) {
			font-size: var(--font-size-L);
			border-top: 1px solid var(--color-input-field);
			padding-top: 24px;

			@media (min-width: 768px) {
				font-size: var(--font-size-ML);
			}

			@media (min-width: 1440px) {
				margin-bottom: 14px;
			}
		}

		&:deep(a) {
			text-decoration: underline;
			text-underline-offset: 0.2rem;
		}

		&:deep(img) {
			min-width: 0 !important;
			max-width: 100% !important;
			box-sizing: content-box;
		}

		&:deep(blockquote) {
			padding: 0 1em;
			border-left: 0.25em solid var(--color-input-icons);
		}

		&:deep(table) {
			width: max-content;
			max-width: 100%;
			overflow: auto;
			margin-top: 0;
			margin-bottom: 16px;
			border-collapse: collapse;
			border-spacing: 0;
		}

		&:deep(tr) {
			border-top: 1px solid var(--color-input-icons);
		}

		&:deep(th),
		&:deep(td) {
			padding: 6px 13px;
			border: 1px solid var(--color-input-icons);
		}

		&:deep(th) {
			font-weight: var(--font-weight-bold);
		}

		&:deep(hr) {
			border-style: none;
			border-top: 1px solid var(--color-input-field);
		}
	}
}
</style>
