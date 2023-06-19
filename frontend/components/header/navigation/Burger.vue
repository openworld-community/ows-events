<script setup lang="ts"></script>

<template>
	<button class="burger">
		<span></span>
		<span></span>
		<span></span>
	</button>
</template>

<style scoped lang="less">
.burger {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 32px;
	height: 32px;
	padding-top: 3px;
	padding-bottom: 3px;
	padding-left: 8px;

	& > span {
		width: 100%;
		height: 2px;
		background-color: var(--color-text);
		border-radius: 1px;
		margin-bottom: 6px;

		&:first-child {
			transition: transform 0.1s ease;
		}

		&:last-child {
			transition: transform 0.1s ease;
			margin-bottom: 0;
		}
	}

	&--cross {
		& > span {
			&:nth-child(2) {
				visibility: hidden;
			}

			&:first-child {
				transform: translateY(9px) rotate(45deg);
			}

			&:last-child {
				transform: translateY(-7px) rotate(-45deg);
			}
		}
	}
}
</style>
