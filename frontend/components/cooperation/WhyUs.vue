<template>
	<div class="why-us">
		<h2 class="why-us__title">{{ $t('cooperation.whyUs.title') }}</h2>
		<p class="why-us__description">
			{{ $t('cooperation.whyUs.description.ourGoal') }}
		</p>
		<p class="why-us__description">
			{{ $t('cooperation.whyUs.description.ourMission') }}
		</p>
	</div>
</template>

<style lang="less" scoped>
.why-us {
	display: flex;
	flex-direction: column;
	margin-top: 60px;
	margin-bottom: 30px;
	@media (max-width: 768px) {
		margin-top: 26px;
	}

	&__title {
		font-size: 32px;
		padding-bottom: 25px;
		@media (max-width: 768px) {
			padding-bottom: 45px;
			font-size: 26px;
			text-align: center;
		}
		@media (max-width: 375px) {
			padding-bottom: 45px;
			font-size: 26px;
			text-align: center;
		}
	}
	&__description {
		font-size: var(--font-size-L);
		line-height: 1.5;
		padding-bottom: 15px;
		@media (max-width: 768px) {
			padding-bottom: 15px;
			font-size: var(--font-size-ML);
		}
	}
}
</style>
