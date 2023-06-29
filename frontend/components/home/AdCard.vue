<script setup lang="ts">
const props = defineProps({
	adData: {
		type: Object,
		required: true
	}
});
</script>

<template>
	<div class="add-block">
		<span
			class="add-label"
			role="button"
			tabindex="0"
			:aria-label="$t('home.events.ad')"
			>{{ $t('home.events.ad') }}
		</span>
		<div class="card-title">
			{{ props.adData.title }}
		</div>
		<div class="card-content description">
			{{ props.adData.description }}
		</div>
		<div class="card-action">
			<a :href="props.adData.link"> {{ $t('home.events.anchor_chat') }}! </a>
		</div>
	</div>
</template>

<style scoped lang="less">
.ad-block {
	margin-top: 10px;
	margin-bottom: 10px;
	border: 1px solid rgba(128, 128, 128, 0.663);
	border-radius: 5px;
	padding: 10px;
	position: relative;

	.add-label {
		position: absolute;
		top: 10px;
		right: 10px;
		opacity: 0.5;
	}

	.description {
		font-size: 80%;
	}
}
</style>
