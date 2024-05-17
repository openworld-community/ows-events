<script setup>
import { CollapsibleTrigger } from 'radix-vue';
</script>
<template>
	<LibraryCollapsible>
		<template #content><slot name="tags" /></template>
		<template #trigger-reversed="opened">
			<div class="trigger">
				<CollapsibleTrigger
					class="trigger__trigger"
					tabindex="0"
					:aria-label="$t(`home.filter.tags_button.aria`)"
				>
					<span class="trigger__text">{{
						opened.isOpen
							? $t(`home.filter.tags_button.close`)
							: $t(`home.filter.tags_button.open`)
					}}</span>
					<CommonIcon
						name="container"
						size="4rem"
						color="#4E4E4E"
						width="12px"
					/>
				</CollapsibleTrigger>
			</div>
		</template>
	</LibraryCollapsible>
</template>

<style scoped lang="less">
.trigger {
	display: flex;
	justify-content: center;
	align-items: end;

	&__trigger {
		align-self: center;
		background-color: #eeeeee;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 8px;
		//box-shadow: 1px -2px 15px rgba(0, 0, 0, 0.15);
		//margin-bottom: 1px;

		@media (min-width: 768px) {
			gap: 12px;
			padding: 6px 12px;
		}

		&:focus-visible {
			background-color: var(--color-input-field);
		}
		&:hover {
			background-color: var(--color-input-field);
		}
	}
	&__text {
		line-height: 18px;
		letter-spacing: -0.3%;
		font-weight: 600;
		font-size: var(--font-size-S);
		line-height: 16px;
	}

	&__trigger[data-state='open'] {
		:deep(svg) {
			transform: rotate(180deg);
		}
	}
}
</style>
