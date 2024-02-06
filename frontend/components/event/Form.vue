<script setup lang="ts">
import { useEventStore } from '../../stores/event.store';
import { getEventPayload, getInitialEventFormValues } from '../../utils/events';
import type { EventFormType } from '../../../common/types/event';
import { LocalStorageEnum } from '../../constants/enums/common';

import { useForm } from 'vee-validate';
import { eventValidationSchema } from '~/components/event/eventValidationSchema';

const eventStore = useEventStore();

const schema = eventValidationSchema;

onMounted(async () => {
	await eventStore.getTimezones();
});
const props = defineProps({
	initialValues: {
		type: Object as PropType<EventFormType>,
		default: () => {}
	}
});

const emit = defineEmits(['createEvent', 'cancelEvent']);

const { values, handleSubmit } = useForm<EventFormType>({
	validationSchema: schema,
	initialValues:
		JSON.parse(localStorage.getItem(LocalStorageEnum.EVENT_DATA)) !== null
			? {
					...getInitialEventFormValues(),
					...JSON.parse(localStorage.getItem(LocalStorageEnum.EVENT_DATA))
			  }
			: props.initialValues
});
const isLoading = ref(false);
// Запись в localStorage
watch(
	() => values,
	(values) => {
		localStorage.setItem(LocalStorageEnum.EVENT_DATA, JSON.stringify(values));
	},
	{ deep: true }
);

const onSubmit = handleSubmit(
	async (values: EventFormType) => {
		const payload = getEventPayload(values);

		isLoading.value = true;
		emit('createEvent', payload);
	},
	() => {
		document.getElementsByClassName('validation_error')[0].scrollIntoView({
			behavior: 'smooth'
		});
	}
);
</script>

<template>
	<form
		class="event-form"
		novalidate
		@submit.prevent="onSubmit"
	>
		<div class="event-form__title-wrapper">
			<h1 class="event-form__title">
				{{ $t('form.event.title') }}
			</h1>
		</div>

		<div class="event-form__fields-wrapper">
			<div class="event-form__fields">
				<EventFormLocation />

				<EventFormMaininfo />
				<EventFormDate />
				<EventFormPrice />

				<EventFormRegistration />
				<EventFormImage />
				<p class="event-form__required">{{ $t('form.global.required') }}</p>
			</div>
		</div>
		<div class="event-form__bottom-wrapper">
			<div class="event-form__bottom">
				<CommonButton
					class="event-form__button"
					button-kind="ordinary"
					:button-text="$t('global.button.cancel')"
					:is-active="!isLoading"
					@click="emit('cancelEvent')"
				/>
				<CommonButton
					class="event-form__button"
					button-kind="dark"
					:button-text="$t('global.button.save')"
					:is-loading="isLoading"
					:is-disabled="false"
					type="submit"
				/>
			</div>
		</div>
	</form>
</template>

<style scoped lang="less">
.event-form {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	height: 100%;
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
