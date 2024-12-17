<script setup lang="ts">
import { type EventOnPoster } from '../../../common/types';
import { type PaymentInfo } from '../../../common/types/payment-info';
import { ref } from 'vue';
import Markdown from 'vue3-markdown-it';

const config = useRuntimeConfig();

const { t } = useI18n();
const route = useRoute();

useHead({
	titleTemplate: `%s / ${t('meta.payment_info.title')}`,
	meta: [
		{ property: 'og:site_name', content: t('meta.default_title') },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:title', content: t('meta.payment_info.title') },
		{ property: 'og:description', content: t('meta.default_description') },
		{
			property: 'og:image',
			content: config.public.baseUrl + '/assets/img/event-preview@2x.png'
		},
		{ property: 'og:url', content: config.public.baseUrl + route.path }
	]
});

const eventId = getFirstParam(route.params.eventId);

const paymentInfo = ref<{ event: EventOnPoster; paymentsInfo: PaymentInfo } | null>(null);

const loadPaymentInfo = async () => {
	const { data } = await apiRouter.payment.get.useQuery({ data: { eventId } });
	if (!data.value) return console.error('No payment info retrieved');

	paymentInfo.value = data.value;
};

await loadPaymentInfo();
</script>

<template>
	<main>
		<section v-if="eventId && paymentInfo && paymentInfo.paymentsInfo">
			<div v-if="paymentInfo.paymentsInfo.type === 'table'">
				<h2 class="title">Информация об оплате: {{ paymentInfo.event.title }}</h2>
				<p>
					Стоимость билета зависит от валюты и будет повышаться по мере приближения
					ивента. Есть скидка для партнёров — жён, мужей, девушек, парней — приходите
					вместе! Скидки не суммируются (на партнера также не распространяются), действует
					самая большая.
				</p>
				<h3>Крипта</h3>
				<p>
					Для нас крипта – приоритетный способ оплаты, поэтому выбирая его, вы получаете
					скидку.
				</p>
				<p>
					НАПИШИТЕ @Alexears В ТЕЛЕГРАМ, ЧТО ВЫ ОПЛАТИЛИ КРИПТОЙ! И УКАЖИТЕ ПОЧТУ, С
					КОТОРОЙ РЕГИСТРИРОВАЛИСЬ!
				</p>
				<h3>Рубли</h3>
				<p>
					В комментарии к платежу укажите свой ник в telegram и почту, с которой
					регистрировались!
				</p>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Номер/ссылка</th>
							<th>Сумма</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="row of paymentInfo.paymentsInfo.rows"
							:key="row.toString()"
						>
							<td>{{ row.name }}</td>
							<td>
								<a
									v-if="row.link"
									:href="row.link"
								>
									{{ row.link }}
								</a>
								<p v-else>{{ row.account }}</p>
							</td>
							<td>
								<span v-if="row.price">{{ row.price }}.</span>
								<span v-else>Бесплатно</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div v-else-if="paymentInfo.paymentsInfo.type === 'markdown'">
				<Markdown :source="paymentInfo.paymentsInfo.source" />
			</div>
		</section>
		<div v-else>Эвент не найден:(</div>
	</main>
</template>

<style lang="less" scoped>
main {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;

	:deep(h1) {
		font-size: 20px;
	}

	:deep(h2) {
		font-size: 20px;
	}

	section {
		max-width: 500px;
		width: 100%;

		table {
			max-width: 100%;

			tr {
				display: flex;

				th,
				td {
					padding: 10px;
					flex: 1;
					max-width: 150px;
					width: 33vw;
					word-wrap: break-word;
				}
			}
		}
	}
}
</style>
