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
	gap: 20px;
	&__title {
		padding-bottom: 10px;
	}
	&__description {
		font-size: var(--font-size-L);
		line-height: 1.5;
	}
}
</style>
