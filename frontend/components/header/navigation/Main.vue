<script setup>
import { RoutePathEnum } from '../../../constants/enums/route';
import { SUPPORT_TG_URL } from '../../../constants/url';
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
				class="navigation-list__nav-link"
			>
				{{ $t('header.navigation.about') }}
			</CommonNavLink>
		</li>
		<li class="header__nav-item">
			<CommonNavLink
				:to="SUPPORT_TG_URL"
				is-external-link
				class="navigation-list__nav-link"
			>
				{{ $t('header.navigation.support') }}
			</CommonNavLink>
		</li>
		<li class="header__nav-item">
			<CommonNavLink
				:to="RoutePathEnum.DONATION"
				class="navigation-list__nav-link"
			>
				{{ $t('header.navigation.donation') }}
			</CommonNavLink>
		</li>
	</ul>
</template>

<style scoped lang="less">
.navigation-list {
	@media (min-width: 768px) {
		display: flex;
		width: 100%;
		max-width: 480px;
		justify-content: space-between;
		align-items: center;
		gap: 18px;
		margin-left: auto;
		margin-right: auto;
	}

	&__nav-item {
		@media (min-width: 768px) {
			display: flex;
			align-items: center;
			position: relative;
		}
	}

	&__nav-link {
		@media (min-width: 768px) {
			font-size: var(--font-size-S);
		}
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
