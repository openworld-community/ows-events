<script setup lang="ts">
import {
	SeoItempropOrganizationEnum,
	SeoItempropURLEnum,
	SeoItemTypeEnum
} from '../constants/enums/seo';
import { RoutePathEnum } from '../constants/enums/route';

const mobile = inject('mobile');
const localePath = useLocalePath();
</script>

<template>
	<div class="root">
		<HeaderCommon />
		<main class="privacy">
			<h1 class="privacy__main-title">{{ $t('limitation_of_liability.title') }}</h1>
			<p class="privacy__paragraph">
				{{ $t('limitation_of_liability.last_change') }} {{ $d(Date.parse('2023-06-25')) }}
			</p>

			<ol
				class="privacy__list"
				itemscope
				:itemtype="SeoItemTypeEnum.ORGANIZATION"
				:itemprop="SeoItempropOrganizationEnum.PUBLISHING_PRINCIPLES"
			>
				<li>
					{{ $t('limitation_of_liability.p_1_1') }}
					<NuxtLink
						:to="localePath(RoutePathEnum.HOME)"
						class="link"
						target="_blank"
						itemscope
						:itemtype="SeoItemTypeEnum.URL"
						:itemprop="SeoItempropURLEnum.FEEDBACK_POLITY"
					>
						afisha.peredelano.com
					</NuxtLink>
					{{ $t('limitation_of_liability.p_1_2') }}
					<NuxtLink
						:to="localePath(RoutePathEnum.HOME)"
						class="link"
						target="_blank"
						itemscope
						:itemtype="SeoItemTypeEnum.URL"
						:itemprop="SeoItempropURLEnum.FEEDBACK_POLITY"
					>
						afisha.peredelano.com
					</NuxtLink>
					{{ $t('limitation_of_liability.p_1_3') }}
					<span :itemprop="SeoItempropOrganizationEnum.BRAND"> AfishaPeredelano </span>
					{{ $t('limitation_of_liability.p_1_4') }}
				</li>
				<li>
					{{ $t('limitation_of_liability.p_2') }}
				</li>
				<li>
					{{ $t('limitation_of_liability.p_3') }}
				</li>
				<li>
					{{ $t('limitation_of_liability.p_4') }}
				</li>
				<li>
					{{ $t('limitation_of_liability.p_5') }}
				</li>
				<li>
					{{ $t('limitation_of_liability.p_6') }}
				</li>
				<li>
					{{ $t('limitation_of_liability.p_7') }}
				</li>
				<li>
					{{ $t('limitation_of_liability.p_8') }}
				</li>
			</ol>
		</main>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style scoped lang="less">
.privacy {
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: var(--padding-vertical);

	&__main-title {
		font-size: var(--font-size-XXL);
		line-height: 40px;
		font-weight: var(--font-weight-bold);
		margin-bottom: 15px;
		margin-top: var(--padding-vertical);

		@media (min-width: 1440px) {
			margin-bottom: 30px;
			margin-top: 0;
		}
	}

	&__title {
		font-size: var(--font-size-L);
		padding-top: 10px;
		margin-bottom: 15px;
	}

	&__paragraph,
	&__list > li {
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: 15px;

		@media (min-width: 768px) {
			margin-bottom: 20px;
			line-height: 24px;
		}
	}

	&__list > li {
		list-style-type: decimal;
		list-style-position: inside;

		.link {
			text-decoration: underline;
			font-weight: 500;
		}
	}
}
</style>
