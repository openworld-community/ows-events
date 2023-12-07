<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { useEventStore } from '../../stores/event.store';
import type { PostEventPayload } from '../../../common/types/event';
import { LocalStorageEnum } from '../../constants/enums/common';
import { getTimezone } from '../../services/timezone.services';
import { getCurrencyByCountry } from '../../utils/prices';
import { TagsArray } from '../../../common/const/tags';

const locationStore = useLocationStore();
const eventStore = useEventStore();
const router = useRouter();
const localePath = useLocalePath();
const mobile = inject('mobile');

onMounted(async () => {
	await eventStore.getTimezones();
	eventStore.setEventData();
});

// Запись в localStorage
watch(
	() => eventStore.$state.eventData,
	(eventData) => {
		if (!eventStore.clearForm) {
			localStorage.setItem(LocalStorageEnum.EVENT_DATA, JSON.stringify(eventData));
		}
	},
	{ deep: true }
);

// Изменение страны и города
watch(
	[
		() => eventStore.$state.eventData.location.country,
		() => eventStore.$state.eventData.location.city
	],
	async ([country, city]) => {
		if (country) {
			eventStore.eventData.timezone = await getTimezone(country, city);

			if (!eventStore.eventData.isFree) {
				eventStore.eventData.price.currency = getCurrencyByCountry(country);
			}
		} else {
			eventStore.eventData.timezone = '';
			eventStore.eventData.location.city = '';
			eventStore.eventData.location.address = '';
			eventStore.eventData.price.currency = '';
		}
		if (!city) eventStore.eventData.location.address = '';
	},
	{ deep: true }
);

// Изменение даты и времени
watch(
	[
		() => eventStore.$state.eventData.startDate,
		() => eventStore.$state.eventData.startTime,
		() => eventStore.$state.eventData.endDate
	],
	([startDate, startTime, endDate]) => {
		if (!startDate) eventStore.eventData.startTime = null;
		if (!startTime) eventStore.eventData.endDate = null;
		if (!endDate) eventStore.eventData.endTime = null;
	},
	{ deep: true }
);

const submitEvent = async () => {
	eventStore.eventData.isLoading = true;

	const eventStartEpoch = combineDateTime(
		eventStore.eventData.startDate,
		eventStore.eventData.startTime
	).getTime();

	const eventEndEpoch = combineDateTime(
		eventStore.eventData.endDate,
		eventStore.eventData.endTime
	).getTime();

	const paramsForSubmit: PostEventPayload = {
		title: eventStore.eventData.title,
		organizer: eventStore.eventData.organizer,
		description: eventStore.eventData.description,
		date: eventStartEpoch,
		durationInSeconds: Math.floor(Math.max(0, eventEndEpoch - eventStartEpoch) / 1000),
		location: {
			country: eventStore.eventData.location.country,
			city: eventStore.eventData.location.city,
			address: eventStore.eventData.location.address
		},
		price: {
			minValue: null,
			value: eventStore.eventData.isFree ? 0 : Number(eventStore.eventData.price.value),
			maxValue: null,
			currency: eventStore.eventData.isFree ? null : eventStore.eventData.price.currency
		},
		timezone: stringToTimezone(eventStore.eventData.timezone),
		image: eventStore.eventData.image,
		url: eventStore.eventData.url,
		tags: eventStore.eventData.tags
	};

	if (eventStore.eventData.editing) {
		paramsForSubmit.id = eventStore.eventData.id;
		const { error } = await apiRouter.events.edit.useMutation({
			data: { event: paramsForSubmit }
		});
		if (!error.value) {
			eventStore.$patch({ clearForm: true });
			await navigateTo(localePath(`/event/${eventStore.eventData.id}`));
		}
	} else {
		const { data } = await apiRouter.events.add.useMutation({
			data: { event: paramsForSubmit }
		});

		if (data.value) {
			eventStore.$patch({ clearForm: true });
			await navigateTo(localePath(`/event/${data.value.id}`));
		} else {
			eventStore.eventData.isLoading = false;
			return;
		}
	}

	eventStore.eventData.isLoading = false;
};
</script>

<template>
	<div class="event-form">
		<div class="event-form__title-wrapper">
			<h1 class="event-form__title">
				{{
					$t(eventStore.eventData.editing ? 'form.event.title_edit' : 'form.event.title')
				}}
			</h1>
		</div>
		<div class="event-form__fields-wrapper">
			<div class="event-form__fields">
				<ModalUiModalSection
					:label="$t('form.event.fields.location')"
					:type="mobile ? 'column' : 'column-row'"
				>
					<template #child>
						<div>
							<CommonUiBaseSelect
								v-model="eventStore.eventData.location.country"
								name="country"
								:placeholder="$t('global.country')"
								:list="locationStore.countries"
								input-readonly
								required
							/>

							<CommonUiBaseSelect
								v-model="eventStore.eventData.location.city"
								name="city"
								:disabled="!eventStore.eventData.location.country"
								:placeholder="$t('global.city')"
								:list="
									locationStore.getCitiesByCountry(
										eventStore.eventData.location.country
									)
								"
								input-readonly
								required
							/>

							<CommonUiBaseSelect
								v-model="eventStore.eventData.timezone"
								name="timezone"
								:disabled="!eventStore.eventData.location.country"
								:placeholder="$t('global.timezone')"
								:list="eventStore.allTimezones"
								required
							/>
						</div>
						<CommonUiBaseInput
							v-model="eventStore.eventData.location.address"
							name="address"
							:placeholder="$t('form.event.fields.address_placeholder')"
							:disabled="
								!(
									eventStore.eventData.location.country &&
									eventStore.eventData.location.city
								)
							"
						/>

						<div
							v-if="
								eventStore.eventData.location.city &&
								eventStore.eventData.location.address
							"
							class="modal-card__check-location check-location"
						>
							<CommonIcon
								class="check-location__icon"
								name="error"
								width="26"
								height="26"
								color="var(--color-accent-red)"
							/>
							<p class="check-location__text">
								<span>
									{{ $t('form.event.fields.check_address') }}
								</span>
								<NuxtLink
									:to="getLocationLink(eventStore.eventData.location)"
									target="_blank"
									class="check-location__link"
								>
									{{ $t('form.event.fields.address_link') }}
								</NuxtLink>
							</p>
						</div>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection :label="$t('form.event.fields.main_info')">
					<template #child>
						<CommonUiBaseInput
							v-model="eventStore.eventData.title"
							name="title"
							:placeholder="$t('form.event.fields.title')"
							required
						/>
						<CommonUiBaseInput
							v-model="eventStore.eventData.organizer"
							name="organizer"
							:placeholder="$t('form.event.fields.organizer')"
						/>
						<CommonUiTextArea
							v-model="eventStore.eventData.description"
							name="description"
							:placeholder="$t('form.event.fields.description')"
							required
						/>
						<div class="event-form__tags">
							<CommonUiTag
								v-for="tag in TagsArray"
								:key="tag"
								v-model="eventStore.eventData.tags"
								:tag-key="tag"
								is-checkbox
								:is-disabled="
									eventStore.eventData.tags.length >= 6 &&
									!eventStore.eventData.tags.includes(tag)
								"
								size="small"
							/>
						</div>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="$t('form.event.fields.start')"
				>
					<template #child>
						<CommonUiDateTimepicker
							v-model="eventStore.eventData.startDate"
							type="date"
							name="startDate"
							:min-date="eventStore.minDate"
							required
						/>
						<CommonUiDateTimepicker
							v-model="eventStore.eventData.startTime"
							type="time"
							name="startTime"
							placeholder="--:--"
							:disabled="!eventStore.eventData.startDate"
							required
							:min-time="
								eventStore.eventData.startDate?.toDateString() ===
								new Date().toDateString()
									? getTimeFromEpochInMs(Date.now(), true)
									: undefined
							"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="$t('form.event.fields.end')"
				>
					<template #child>
						<CommonUiDateTimepicker
							v-model="eventStore.eventData.endDate"
							type="date"
							name="endDate"
							:min-date="eventStore.eventData.startDate ?? eventStore.minDate"
							:disabled="!eventStore.eventData.startTime"
						/>
						<CommonUiDateTimepicker
							v-model="eventStore.eventData.endTime"
							type="time"
							name="endTime"
							placeholder="--:--"
							:disabled="!eventStore.eventData.endDate"
							:required="!!eventStore.eventData.endDate"
							:min-time="
								eventStore.eventData.startDate?.toDateString() ===
								eventStore.eventData.endDate?.toDateString()
									? eventStore.eventData.startTime
									: undefined
							"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="column-row"
					:label="$t('form.event.fields.price')"
				>
					<template #child>
						<div>
							<CommonUiBaseSelect
								v-model="eventStore.eventData.price.currency"
								name="currency"
								:placeholder="$t('form.event.fields.currency_placeholder')"
								:list="locationStore.currencies"
								has-icon-items
								input-readonly
								:disabled="eventStore.eventData.isFree"
								:required="!eventStore.eventData.isFree"
							/>
							<CommonUiBaseInput
								v-model="eventStore.eventData.price.value"
								name="price"
								type="number"
								:min-value="0"
								:disabled="eventStore.eventData.isFree"
								:required="!eventStore.eventData.isFree"
								:placeholder="$t('form.event.fields.price_placeholder')"
							/>
						</div>
						<CommonUiBaseCheckbox
							value="free"
							:label="$t('form.event.fields.price_free')"
							is-reversed
							:model-value="eventStore.eventData.isFree"
							@update:model-value="eventStore.toggleFree"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection :label="$t('form.event.fields.url_to_registration')">
					<template #child>
						<CommonUiBaseInput
							v-model="eventStore.eventData.url"
							name="url"
							type="url"
							:placeholder="$t('form.event.fields.url_placeholder')"
							required
						/>
					</template>
				</ModalUiModalSection>

				<CommonImageLoader
					v-model="eventStore.eventData.image"
					:external-image="eventStore.eventData.image"
				/>
				<p class="event-form__required">{{ $t('form.global.required') }}</p>
			</div>
		</div>
		<div class="event-form__bottom-wrapper">
			<div class="event-form__bottom">
				<CommonButton
					class="event-form__button"
					button-kind="ordinary"
					:button-text="$t('global.button.cancel')"
					:is-active="!eventStore.eventData.isLoading"
					@click="router.back()"
				/>
				<CommonButton
					class="event-form__button"
					button-kind="success"
					:button-text="$t('global.button.save')"
					:is-loading="eventStore.eventData.isLoading"
					:is-disabled="!eventStore.checkFormFilling || eventStore.eventData.isLoading"
					@click="eventStore.eventData.isLoading ? null : submitEvent()"
				/>
			</div>
		</div>
		<ModalClearEventForm v-if="eventStore.showClearFormModal" />
	</div>
</template>

<style scoped lang="less">
.event-form {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	max-height: 100vh;

	// Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		max-height: -webkit-fill-available;
	}

	&__title-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		background-color: var(--color-background-secondary);
	}

	&__title {
		width: 100%;
		max-width: 1200px;
		text-align: left;
		font-size: var(--font-size-XL);
		font-weight: var(--font-weight-regular);
		padding: 12px var(--padding-side);

		@media (min-width: 768px) {
			padding: 30px var(--padding-side);
		}
	}

	&__fields-wrapper {
		width: 100%;
		overflow-y: auto;
	}

	&__fields {
		display: flex;
		width: 100%;
		max-width: 1200px;
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
		padding: 20px var(--padding-side);
	}

	&__tags {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		gap: 10px;
	}

	&__required {
		font-size: var(--font-size-XS);
		line-height: 18px;
		color: var(--color-text-secondary);
		margin-top: var(--space-unrelated-items);
	}

	&__bottom-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		background-color: var(--color-background-secondary);
	}

	&__bottom {
		display: flex;
		width: 100%;
		max-width: 1200px;
		justify-content: space-between;
		padding: 12px var(--padding-side);

		@media (min-width: 768px) {
			padding: 30px var(--padding-side);
		}
	}

	&__button {
		width: 48%;
	}
}

.check-location {
	display: flex;
	align-items: center;

	&__icon {
		flex-shrink: 0;
		margin-right: 20px;
	}

	&__text {
		font-size: var(--font-size-XS);
		line-height: 18px;
	}

	&__link {
		color: var(--color-link);
		text-decoration: underline;
	}
}
</style>
