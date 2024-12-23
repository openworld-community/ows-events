<script setup l lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
	iconName: {
		type: String,
		default: ''
	},
	data: {
		type: String,
		default: ''
	},
	dataOptional:{
		type: String,
		default: ''
	},
	size: {
		type: String as PropType<'big' | 'small'>,
		default: 'small'
	},
	to: {
		type: String,
		default: ''
	}
});
const component = computed(() => {
	if (props.to) return defineNuxtLink({});
	else return 'p';
});
</script>
<template>
	<li class="details">
		<component
			:is="component"
			:target="to ? '_blank' : null"
			class="details__item"
			:to="to ? to : null"
		>
			<CommonIcon
				:name="iconName"
				class="details__icon"
				color="var(--color-accent-green-main)"
			/>
			<span
				:class="[
					'details__text',
					{
						'details__text-card': size === 'small',
						text2: size === 'big',
						'details__text-link': Boolean(to)
					}
				]"
			>
				<span>{{ data }}</span>
				<span>{{ dataOptional }}</span>
			</span>
		</component>
	</li>
</template>
<style lang="less" scoped>
.details {
	&__item {
		display: flex;
		width: 100%;
		align-items: center;
	}
	&__icon {
		min-width: 24px;
		margin-right: 8px;
	}
	&__text {
		vertical-align: center;
		display: flex;
    flex-direction: column;
	}
	&__text span:nth-child(2) {
		margin-top: 3px;
	}
	&__text span:empty {
		margin-top: 0px;
	}
	&__text-card {
		font-size: var(--font-size-S);
		line-height: 2.1rem;
	}
	&__text-link {
		text-decoration: underline;
	}
}

@media (min-width: 1440px) {
	.details {
		&__text span:nth-child(2) {
		margin-top: 0px;
	}
	}
}
</style>
