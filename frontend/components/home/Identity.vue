<script setup lang="ts">
import { inject } from 'vue';

const mobile = inject('mobile');
</script>

<template>
	<div :class="mobile ? 'main-page__identity__mobile' : 'main-page__identity'">
		<img
			:alt="$t('home.identity.alt')"
			:src="mobile ? '/img/home/identity-mobile.svg' : '/img/home/identity.svg'"
		/>
	</div>
</template>

<style scoped lang="less">
.filters {
	//display: grid;
	width: 100%;
	max-width: 1200px;

	&__wrapper {
		--gap: 10px;
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		grid-column: span 3;
		gap: var(--gap);
		margin-bottom: 20px;

		@media (min-width: 768px) {
			box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
			border-radius: 8px;
			align-items: center;
			margin-top: 0;
			gap: var(--gap);
			grid-template-columns: 1fr 1fr;

			&:deep(.calendar) {
				max-width: 100%;
			}
		}
		@media (min-width: 1440px) {
			background-color: var(--color-white);
			margin-bottom: 40px;
			gap: 0;
		}
	}

	&__tags {
		width: 100%;
	}
}
</style>
