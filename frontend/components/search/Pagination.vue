<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { EventOnPoster } from '../../../common/types';

interface ResponsiveDevice {
    value: boolean;
}
interface PaginationResponse {
	docs: EventOnPoster[];
	totalDocs: number;
	limit: number;
	page: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}

export default defineComponent({
	setup() {
		const mobile = inject <ResponsiveDevice>('mobile');
		const tablet = inject<ResponsiveDevice>('tablet');
		const desktop = inject<ResponsiveDevice>('desktop');

		const scrollOnTop = (width) => {
			console.log(width);
			window.scrollTo({
				top: width,
				behavior: 'smooth'
			});
		};
		const response = reactive<PaginationResponse>({
			docs: [],
			totalDocs: 0,
			limit: 15,
			page: 1,
			totalPages: 1,
			hasPrevPage: false,
			hasNextPage: false,
			prevPage: null,
			nextPage: null
		});

		const loading = ref(false);
		const route = useRoute();
		const router = useRouter();

		const getLimit = () => {
			return mobile?.value ? 10 : tablet.value ? 14 : 15;
		};

		const fetchPage = async (page: number | null) => {
			if (!page || loading.value) return;
			loading.value = true;
			try {
				const res = await fetch('/api/events/find/pagination', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: {},
						options: { page: page, limit: getLimit() }
					})
				});
				if (!res.ok) {
					throw new Error(`Ошибка запроса: ${res.status}`);
				}
				const data: PaginationResponse = await res.json();
				Object.assign(response, data);
				// scrollOnTop(mobile?.value ? 150 : tablet?.value ? 250 : 450);
			} catch (error) {
				console.error('Ошибка загрузки данных:', error);
			} finally {
				loading.value = false;
			}
		};

		watch(
			() => route.query.page,
			(newPage) => {
				const page = parseInt(newPage as string, 10) || 1;
				fetchPage(page);
			},
			{ immediate: true }
		);

		return {
			response,
			loading,
			router,
			route
		};
	}
});
</script>

<template>
	<div class="pagination-container">
		<!-- Компонент отображения событий -->
		<SearchEventCardsList
			v-if="response.docs && response.docs.length !== 0"
			:events="response.docs"
		/>

		<!-- Элементы управления пагинацией -->
		<div class="pagination-controls">
			<!-- Первая страница -->
			<NuxtLink
				v-if="response.page > 1"
				:to="{ query: { ...route.query, page: 1 } }"
				class="pagination-link"
				:class="{ disabled: loading }"
			>
				{{ '<<' }}
			</NuxtLink>

			<!-- Кнопка назад -->
			<NuxtLink
				v-if="response.hasPrevPage"
				:to="{ query: { ...route.query, page: response.prevPage } }"
				class="pagination-link"
				:class="{ disabled: loading }"
			>
				{{ '<' }}
			</NuxtLink>

			<!-- Текущая и следующая страницы -->
			<NuxtLink
				v-for="page in [
					response.page,
					response.hasNextPage ? response.nextPage : null
				].filter(Boolean)"
				:key="page"
				:to="{ query: { ...route.query, page } }"
				class="pagination-link"
				:class="{ active: response.page === page, disabled: loading }"
			>
				{{ page }}
			</NuxtLink>

			<!-- Кнопка вперед -->
			<NuxtLink
				v-if="response.hasNextPage"
				:to="{ query: { ...route.query, page: response.nextPage } }"
				class="pagination-link"
				:class="{ disabled: loading }"
			>
				{{ '>' }}
			</NuxtLink>

			<!-- Последняя страница -->
			<NuxtLink
				v-if="response.page < response.totalPages"
				:to="{ query: { ...route.query, page: response.totalPages } }"
				class="pagination-link"
				:class="{ disabled: loading }"
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
