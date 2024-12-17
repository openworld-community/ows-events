<template>
	<div class="why-us">
		<h2 class="why-us__title">{{ $t('cooperation.whyUs.title') }}</h2>
		<p class="why-us__description text1">
			{{ $t('cooperation.whyUs.description.ourGoal') }}
		</p>
		<p class="why-us__description text1">
			{{ $t('cooperation.whyUs.description.ourMission') }}
		</p>
	</div>
</template>

<style lang="less" scoped>
.why-us {
	display: flex;
	flex-direction: column;
	margin-top: 26px;
	margin-bottom: 30px;

	@media (min-width: 768px) {
		margin-top: 60px;
	}

	&__title {
		padding-bottom: 45px;
		text-align: center;

		@media (min-width: 1440px) {
			padding-bottom: 25px;
			text-align: start;
		}
	}
	&__description {
		padding-bottom: 15px;
	}
}
</style>
