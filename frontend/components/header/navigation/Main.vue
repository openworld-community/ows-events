<script setup lang="ts">
import { RoutePathEnum } from '../../../constants/enums/route';

const mobile = inject('mobile');
</script>

<template>
	<ul
		v-if="!mobile"
		class="navigation-list"
	>
		<li class="navigation-list__nav-item">
			<CommonNavLink
				:to="RoutePathEnum.ABOUT"
				:prefetch="false"
				class="navigation-list__nav-link text2"
			>
				{{ $t('header.navigation.about') }}
			</CommonNavLink>
		</li>
		<li class="navigation-list__nav-item">
			<CommonNavLink
				:to="RoutePathEnum.SUPPORT"
				class="navigation-list__nav-link text2"
			>
				{{ $t('header.navigation.support') }}
			</CommonNavLink>
		</li>
		<li class="navigation-list__nav-item">
			<CommonNavLink
				:to="RoutePathEnum.DONATION"
				class="navigation-list__nav-link text2"
			>
				{{ $t('header.navigation.donation') }}
			</CommonNavLink>
		</li>
		<li class="navigation-list__nav-item">
			<CommonNavLink
				:to="RoutePathEnum.COOPERATION"
				class="navigation-list__nav-link text2"
			>
				{{ $t('header.navigation.cooperation') }}
			</CommonNavLink>
		</li>
	</ul>
</template>

<style scoped lang="less">
.navigation-list {
	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		width: 100%;
		max-width: 600px;
		justify-content: space-between;
		align-items: center;
		gap: 18px;
		margin-left: auto;
		margin-right: auto;
	}
	&__nav-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__nav-link {
		&:hover,
		&:focus-visible {
			color: var(--color-accent-green-dark);
		}
	}
}

.router-link-exact-active {
	color: var(--color-accent-green-main);
	cursor: default;
	text-decoration: none;
	border-bottom: 1px solid var(--color-accent-green-main);
}
</style>
