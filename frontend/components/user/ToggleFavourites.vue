<script setup lang="ts">
import { RoutePathEnum } from '../../constants/enums/route';
import { defineEmits, defineProps } from 'vue';
import type { EventOnPoster } from '../../../common/types';

const props = defineProps<{ event: EventOnPoster;}>();
const emit = defineEmits(['favorite']);

const onFavoriteButtonClick = () => {
	emit('favorite', props.event.id);
};
</script>

<template>
	<div class="toggle-favourites__button">			
				<CommonButton
				:link="RoutePathEnum.USER_FAVOURITES"
                is-round
				icon-name="heart"
				button-kind="text"
				no-border
				:class="[
					'toggle-favourites__button',
					{ 'toggle-favourites__button--expired': props.event.date < Date.now() }
				]"
				@click="onFavoriteButtonClick"
			/>
	</div>
</template>
<style scoped lang="less">
.toggle-favourites {
    height: 100%;
		display: flex;
		flex-direction: row;
		padding: 0px;
		color: black;
		z-index: 1;
		gap: 5px;
		user-select: none;
		right: 0;
		align-items: flex-start;
		justify-content: center;
		pointer-events: none;
		transition: all 0.7s ease-in-out;
        @media (min-width: 1440px) {
			align-items: center;
			padding: 5px 7px 5px 5px;
		}
	&__button {
        width: 30px;
			height: 30px;
			background-color: var(--color-background-secondary);
			pointer-events: auto;
			@media (min-width: 1440px) {
				width: 40px;
				height: 40px;
			}

			&--expired {
				display: none;
			}
        }
		

		
}
</style>
