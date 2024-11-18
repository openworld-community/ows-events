<script setup lang="ts">
import {
	declinationCountries,
	countries as supportedCountries,
	queryToCountryLocaleName,
	queryToCountryCode
} from '../../../common/const/supportedCountries';
import { useRoute } from 'vue-router';

const { t, locale } = useI18n();

interface ResponsiveDevice {
	value: boolean;
}

const mobile = inject<ResponsiveDevice>('mobile');
const tablet = inject<ResponsiveDevice>('tablet');
const desktop = inject<ResponsiveDevice>('desktop');

// const getLimit = () => {
// 	return mobile?.value ? 10 : tablet.value ? 14 : 15;
// };

const route = useRoute();

const dateStart = computed(() =>
	dateFromQueryToFilter('first', getFirstQuery(route.query.startDate as string))
);
const dateEnd = computed(() => {
	return dateFromQueryToFilter('second', getFirstQuery(route.query.endDate as string));
});
const currentPage = computed(() => {
	return parseInt(getFirstQuery(route.query.page as string));
});
const country = getFirstParam(route.params.country);

const tags = computed(() =>
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '')
);

const { sendAnalytics } = useSendTrackingEvent();

const {
	data: posterEvents,
	error: errorEvents,
	pending
} = await apiRouter.filters.findEventsByCountryPagination.useQuery({
	data: {
		country,
		query: {
			tags,
			startDate: dateStart,
			endDate: dateEnd
		},
		options: {
			page: currentPage,
			limit: 12
		},
		watch: [tags.value, dateStart.value, dateEnd.value, currentPage.value]
	}
});

watch(
	() => route.query,
	(value) => {
		if (route.query.page) {
			window.scrollTo({
				top: mobile?.value ? 150 : tablet.value ? 220 : 350,
				behavior: 'smooth'
			});
		}
		if (Object.keys(value).length) {
			sendAnalytics.search({
				search_term: route.fullPath.split('?')[1],
				tags: value.tags ? getFirstQuery(value.tags) : ''
			});
		}
	},
	{ deep: true }
);

watch(
	() => posterEvents,
	(posterEvents) => {
		if (posterEvents.value.page > posterEvents.value.totalPages) {
			const currentParams = { ...route.query, ...{ page: 1 } };
			navigateTo({ query: currentParams });
		}
	},
	{ deep: true }
);
</script>

<template>
	<div class="pagination__container">
		<div class="pagination__wrapper">
			<!-- Компонент отображения событий -->
			<div
				v-if="posterEvents.docs && posterEvents.docs.length !== 0 && (tablet || mobile)"
				class="pagination__controls"
			>
				<!-- Первая страница -->
				<NuxtLink
					v-if="posterEvents.page > 1"
					:to="{ query: { ...route.query, page: 1 } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="previous-start"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Кнопка назад -->
				<NuxtLink
					v-if="posterEvents.hasPrevPage"
					:to="{ query: { ...route.query, page: posterEvents.prevPage } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="previous"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Текущая и следующая страницы -->
				<NuxtLink
					v-for="page in [
						posterEvents.hasPrevPage ? posterEvents.prevPage : null,
						posterEvents.page,
						posterEvents.hasNextPage ? posterEvents.nextPage : null
					].filter(Boolean)"
					:key="page"
					:to="{ query: { ...route.query, ...{ page } } }"
					:class="[
						'pagination__element',
						{ active: posterEvents.page === page, disabled: pending }
					]"
					@click="$event.target.blur()"
				>
					<span
						:class="[
							'pagination__text',
							{ active: posterEvents.page === page, disabled: pending }
						]"
						>{{ page }}
					</span>
				</NuxtLink>

				<!-- Кнопка вперед -->
				<NuxtLink
					v-if="posterEvents.hasNextPage"
					:to="{ query: { ...route.query, page: posterEvents.nextPage } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="next"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Последняя страница -->
				<NuxtLink
					v-if="posterEvents.page < posterEvents.totalPages"
					:to="{ query: { ...route.query, page: posterEvents.totalPages } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="next-finish"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>
			</div>
			<SearchEventCardsList
				v-if="posterEvents.docs && posterEvents.docs.length !== 0"
				:events="posterEvents.docs"
			/>
			<!-- Элементы управления пагинацией -->
			<div
				v-if="posterEvents.docs && posterEvents.docs.length !== 0 && (mobile || tablet)"
				class="pagination__controls"
			>
				<!-- Первая страница -->
				<NuxtLink
					v-if="posterEvents.page > 1"
					:to="{ query: { ...route.query, page: 1 } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="previous-start"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Кнопка назад -->
				<NuxtLink
					v-if="posterEvents.hasPrevPage"
					:to="{ query: { ...route.query, page: posterEvents.prevPage } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="previous"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Текущая и следующая страницы -->
				<NuxtLink
					v-for="page in [
						posterEvents.hasPrevPage ? posterEvents.prevPage : null,
						posterEvents.page,
						posterEvents.hasNextPage ? posterEvents.nextPage : null
					].filter(Boolean)"
					:key="page"
					:to="{ query: { ...route.query, ...{ page } } }"
					:class="[
						'pagination__element',
						{ active: posterEvents.page === page, disabled: pending }
					]"
					@click="$event.target.blur()"
				>
					<span
						:class="[
							'pagination__text',
							{ active: posterEvents.page === page, disabled: pending }
						]"
						>{{ page }}
					</span>
				</NuxtLink>

				<!-- Кнопка вперед -->
				<NuxtLink
					v-if="posterEvents.hasNextPage"
					:to="{ query: { ...route.query, page: posterEvents.nextPage } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="next"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Последняя страница -->
				<NuxtLink
					v-if="posterEvents.page < posterEvents.totalPages"
					:to="{ query: { ...route.query, page: posterEvents.totalPages } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="next-finish"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>
			</div>
		</div>
		<SearchHeading
			v-if="posterEvents.docs && posterEvents.docs.length !== 0"
			position="down"
			:title="
				$t('country.heading', {
					country: queryToCountryLocaleName[country][locale]
				})
			"
		>
			<!-- Элементы управления пагинацией -->
			<div
				v-if="desktop"
				class="pagination__controls"
			>
				<!-- Первая страница -->
				<NuxtLink
					v-if="posterEvents.page > 1"
					:to="{ query: { ...route.query, page: 1 } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="previous-start"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Кнопка назад -->
				<NuxtLink
					v-if="posterEvents.hasPrevPage"
					:to="{ query: { ...route.query, page: posterEvents.prevPage } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="previous"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Текущая и следующая страницы -->
				<NuxtLink
					v-for="page in [
						posterEvents.hasPrevPage ? posterEvents.prevPage : null,
						posterEvents.page,
						posterEvents.hasNextPage ? posterEvents.nextPage : null
					].filter(Boolean)"
					:key="page"
					:to="{ query: { ...route.query, ...{ page } } }"
					:class="[
						'pagination__element',
						{ active: posterEvents.page === page, disabled: pending }
					]"
					@click="$event.target.blur()"
				>
					<span
						:class="[
							'pagination__text',
							{ active: posterEvents.page === page, disabled: pending }
						]"
						>{{ page }}
					</span>
				</NuxtLink>

				<!-- Кнопка вперед -->
				<NuxtLink
					v-if="posterEvents.hasNextPage"
					:to="{ query: { ...route.query, page: posterEvents.nextPage } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="next"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>

				<!-- Последняя страница -->
				<NuxtLink
					v-if="posterEvents.page < posterEvents.totalPages"
					:to="{ query: { ...route.query, page: posterEvents.totalPages } }"
					:class="['pagination__element__arrow', { disabled: pending }]"
					@click="$event.target.blur()"
				>
					<CommonIcon
						name="next-finish"
						width="24"
						height="24"
						color="var(--color-icons)"
					/>
				</NuxtLink>
			</div>
		</SearchHeading>
	</div>
</template>

<style lang="less" scoped>
.pagination {
	&__text {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
		&:hover {
			transform: scale(1.2);
		}
		&.active {
			transform: none;
		}
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	&__controls {
		width: fit-content;
		align-self: center;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		transition: width 0.5s ease, height 0.5s ease;
	}

	&__element {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-L);
		width: 30px;
		border-radius: 5px;
		text-decoration: none;
		color: var(--color-icons);
		transition: background-color 0.2s;
		font-weight: 500;
		opacity: 0.85;
		transition: background-color 0.2s, width 0.3s ease, height 0.3s ease, opacity 0.2s ease,
			box-shadow 0.2s ease, outline 0.2s ease, color 0.2s ease;

		&.active {
			width: 46px;
			height: 43px;
			font-weight: 500;
			border: 3px solid var(--color-accent-green-main);
			color: var(--color-icons);
			opacity: 1;
			transition: box-shadow 0.3s ease, outline 0.3s ease;
			@media (min-width: 1440px) {
				width: 56px;
				height: 59px;
			}

			&:hover,
			&:focus {
				transform: none;
				width: 46px;
				height: 43px;
				outline: none;
				color: var(--color-accent-green-main);
				@media (min-width: 1440px) {
					width: 56px;
					height: 59px;
				}
			}
			&:hover {
				box-shadow: 0 0 7px var(--color-accent-green-main);
			}
		}

		&.disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		&:hover,
		&:focus {
			opacity: 1;
			color: var(--color-accent-green-main);
			transition: transform 0.3s ease;
		}
		:hover {
			text-shadow: 0 0 10px var(--color-accent-green-main-60);
		}

		&__arrow {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 20px;
			color: var(--color-icons);
			transition: transform 0.3s ease, color 0.3s ease;

			&:hover :deep(svg),
			&:focus :deep(svg) {
				color: var(--color-accent-green-main);
				transform: scale(1.3);
				@media (min-width: 1440px) {
					transform: scale(1.5);
				}
			}

			&:deep(svg) {
				transition: transform 0.3s ease;
				transform-origin: center;
			}
		}
	}
}
</style>
