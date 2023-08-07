<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';
import { SeoItemTypeEnum } from '../constants/enums/seo';
import {useFilterStore} from "../stores/filter.store";

const { t } = useI18n();
const filterStore = useFilterStore()

definePageMeta({ name: RouteNameEnum.HOME });

getMeta({
	title: t('meta.title')
});

const {
	open: openEventModal,
	close: closeEventModal,
	patchOptions: eventModalPatch
} = useModal({ component: EventModal });
eventModalPatch({ attrs: { closeEventModal } });
const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize });
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const debouncedEventsRequestQuery = refDebounced(
	computed(() => ({ searchLine:  filterStore.filters.searchLine, country: filterStore.filters.country, city: filterStore.filters.city})),
	500,
	{ maxWait: 5000 }
);
const { data: posterEvents } = await apiRouter.events.findMany.useQuery({
	data: { query: debouncedEventsRequestQuery }
});

const onButtonClick = () => {
	if (useCookie('token').value) {
		openEventModal();
	} else {
		openNeedAuthorizeModal();
	}
};
const now = Date.now();
</script>

<template>
	<div class="main-page">
		<h1 class="visually-hidden">{{ $t('home.hidden_title') }}</h1>
<!--		<HomeSearch-->
<!--			v-model:search="eventsQuery.searchLine"-->
<!--			class="main-page__search"-->
<!--		/>-->

		<HomeFilter class="main-page__filter" />
    <h2 class="main-page__title">
      {{ $t('home.title') }}
    </h2>
		<ul class="main-page__card-list">
			<li
				v-for="event in posterEvents"
				:key="event.id"
				itemscope
				:itemtype="SeoItemTypeEnum.EVENT"
			>
				<HomeEventPreviewCard
					:class="{ expired: event.date < now }"
					:event-data="event"
				/>
				<!-- <HomeAdCard v-else :ad-data="event" class="ad-block" /> -->
			</li>
		</ul>

		<CommonButton
			class="add-event-button"
			button-kind="success"
			is-round
			icon-name="plus"
			:alt="$t('home.button.add_event_aria')"
			aria-haspopup="true"
			@click="onButtonClick"
		/>
	</div>
</template>

<style lang="less" scoped>
.main-page {
	padding-top: 16px;

	&__title {
		font-size: var(--font-size-XXL);
		line-height: 40px;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: 24px;
	}

	&__filter {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: var(--space-sections);
	}

	&__card-list {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
}

.add-event-button {
	position: sticky;
	bottom: 20px;
	right: 0;
	margin-left: auto;
	margin-right: 20px;
	z-index: 1;
}

.expired {
	opacity: 0.5;
}
</style>
