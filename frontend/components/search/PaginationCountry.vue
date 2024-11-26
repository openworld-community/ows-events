<script setup lang="ts">
import { useRoute } from 'vue-router';

interface ResponsiveDevice {
	value: boolean;
}

const mobile = inject<ResponsiveDevice>('mobile');
const tablet = inject<ResponsiveDevice>('tablet');
const desktop = inject<ResponsiveDevice>('desktop');

const getLimit = () => {
	return mobile?.value ? 10 : tablet.value ? 14 : 15;
};


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
			limit: getLimit()
		},
		watch: [tags.value, dateStart.value, dateEnd.value, currentPage.value]
	}
});

watch(
	() => route.query,
	(value) => {
		if (route.query.page) {
			window.scrollTo({
				top: 450,
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
// export default defineComponent({
// 	setup() {
// 		const mobile = inject <ResponsiveDevice>('mobile');
// 		const tablet = inject<ResponsiveDevice>('tablet');
// 		const desktop = inject<ResponsiveDevice>('desktop');
//
// 		const scrollOnTop = (width) => {
// 			console.log(width);
// 			window.scrollTo({
// 				top: width,
// 				behavior: 'smooth'
// 			});
// 		};
// 		const response = reactive<PaginationResponse>({
// 			docs: [],`
// 			totalDocs: 0,
// 			limit: 15,
// 			page: 1,
// 			totalPages: 1,
// 			hasPrevPage: false,
// 			hasNextPage: false,
// 			prevPage: null,
// 			nextPage: null
// 		});
//
// 		const loading = ref(false);
// 		const route = useRoute();
// 		const router = useRouter();
//
// 		const getLimit = () => {
// 			return mobile?.value ? 10 : tablet.value ? 14 : 15;
// 		};
//
// 		const fetchPage = async (page: number | null) => {
// 			if (!page || loading.value) return;
// 			loading.value = true;
// 			try {
// 				const res = await fetch('/api/events/find/pagination', {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json'
// 					},
// 					body: JSON.stringify({
// 						query: {},
// 						options: { page: page, limit: getLimit() }
// 					})
// 				});
// 				if (!res.ok) {
// 					throw new Error(`Ошибка запроса: ${res.status}`);
// 				}
// 				const data: PaginationResponse = await res.json();
// 				Object.assign(response, data);
// 				// scrollOnTop(mobile?.value ? 150 : tablet?.value ? 250 : 450);
// 			} catch (error) {
// 				console.error('Ошибка загрузки данных:', error);
// 			} finally {
// 				loading.value = false;
// 			}
// 		};
//
// 		watch(
// 			() => route.query.page,
// 			(newPage) => {
// 				const page = parseInt(newPage as string, 10) || 1;
// 				fetchPage(page);
// 			},
// 			{ immediate: true }
// 		);
//
// 		return {
// 			response,
// 			loading,
// 			router,
// 			route
// 		};
// 	}
// });
</script>

<template>
	<div class="pagination-container">
		<!-- Компонент отображения событий -->
		<SearchEventCardsList
			v-if="posterEvents.docs && posterEvents.docs.length !== 0"
			:events="posterEvents.docs"
		/>

		<!-- Элементы управления пагинацией -->
		<div class="pagination-controls">
			<!-- Первая страница -->
			<NuxtLink
				v-if="posterEvents.page > 1"
				:to="{ query: { ...route.query, page: 1 } }"
				class="pagination-link"
				:class="{ disabled: pending }"
			>
				{{ '<<' }}
			</NuxtLink>

			<!-- Кнопка назад -->
			<NuxtLink
				v-if="posterEvents.hasPrevPage"
				:to="{ query: { ...route.query, page: posterEvents.prevPage } }"
				class="pagination-link"
				:class="{ disabled: pending }"
			>
				{{ '<' }}
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
				class="pagination-link"
				:class="{ active: posterEvents.page === page, disabled: pending }"
			>
				{{ page }}
			</NuxtLink>

			<!-- Кнопка вперед -->
			<NuxtLink
				v-if="posterEvents.hasNextPage"
				:to="{ query: { ...route.query, page: posterEvents.nextPage } }"
				class="pagination-link"
				:class="{ disabled: pending }"
			>
				{{ '>' }}
			</NuxtLink>

			<!-- Последняя страница -->
			<NuxtLink
				v-if="posterEvents.page < posterEvents.totalPages"
				:to="{ query: { ...route.query, page: posterEvents.totalPages } }"
				class="pagination-link"
				:class="{ disabled: pending }"
			>
				{{ '>>' }}
			</NuxtLink>
		</div>
	</div>
</template>

<style lang="less" scoped>
.pagination-container {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.pagination-controls {
	display: flex;
	justify-content: center;
	gap: 8px;
}

.pagination-link {
	text-decoration: none;
	padding: 5px 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	color: #333;
	transition: background-color 0.2s;
}

.pagination-link.active {
	font-weight: bold;
	background-color: #007bff;
	color: #fff;
}

.pagination-link.disabled {
	pointer-events: none;
	opacity: 0.5;
}
</style>
