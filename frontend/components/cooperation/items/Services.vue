<script setup lang="ts">
import type { Services } from '.';
import { COOPERATION_PRICING } from '~/constants/defaultValues/cooperation-pricing';

defineProps<Services>();
</script>

<template>
	<div class="service">
		<div class="service__main service__kit">
			<h2 class="service__header">{{ $t(title) }}</h2>
			<img
				:src="image"
				class="service__image"
			/>
		</div>
		<div class="service__main service__options">
			<ul class="service__options__list">
				<li
					v-for="option in $tm(options)"
					:key="$rt(option)"
					class="service__options__list--item"
				>
					{{ $rt(option) }}
				</li>
			</ul>
		</div>
		<div class="service__main service__buy">
			<h2 class="service__price">
				{{
					price === 0
						? $t('cooperation.freePrice')
						: COOPERATION_PRICING.currencySign + price
				}}
			</h2>
			<CommonButton
				class="service__button"
				button-kind="success"
				:button-text="$t(button)"
			/>
		</div>
	</div>
</template>

<style scoped lang="less">
.service {
	width: 100%;
	min-height: 267px;
	border: 2px solid var(--color-accent-green-main);
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	padding: 14px;

	@media (max-width: 950px) {
		flex-direction: column;
		align-items: center;
	}

	&__main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	&__header {
		font-size: var(--font-size-L);
		font-weight: 600;
		@media (max-width: 950px) {
			padding-bottom: 40px;
		}
	}
	&__image {
		height: 200px;
		width: 200px;
		margin-top: 15px;
		@media (max-width: 950px) {
			display: none;
		}
	}
	&__kit {
		display: flex;
		flex-direction: column;
		width: 32%;
		border-right: 2px solid var(--color-input-field);
		justify-content: space-between;
		@media (max-width: 1200px) {
			justify-content: center;
		}
		@media (max-width: 950px) {
			justify-content: center;
			border-right: 0px solid;
			width: 100%;
		}
	}
	&__options {
		padding-left: 2.5vw;
		padding-right: 2.5vw;
		width: 45%;
		border-right: 2px solid var(--color-input-field);
		@media (max-width: 950px) {
			border-right: 0px solid;
			width: 100%;
			align-self: flex-start;
		}
		&__list {
			list-style: disc;

			@media (max-width: 950px) {
				padding-bottom: 20px;
			}

			&--item {
				line-height: 1.7;
				font-size: var(--font-size-L);
				list-style-type: disc;
				@media (max-width: 950px) {
					margin-left: 4vw;
				}
				@media (max-width: 375px) {
					padding-bottom: 20px;
					margin-left: 4vw;
				}
			}
		}
	}
	&__buy {
		width: 23%;
	}
	&__price {
		color: var(--color-social-threads);
		padding-bottom: 26px;
	}
}
</style>
