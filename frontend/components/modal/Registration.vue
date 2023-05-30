<script setup lang="ts">
import { computed, ref } from 'vue';
import { sendFormAboutRegistration } from '@/services/event-registration.services';
import { Registration } from '../../../common/types/registration';

const router = useRouter();

const props = defineProps({
	eventId: {
		type: String,
		default: ''
	},
	close: { type: Function, required: true }
});

const name = ref('');
const telegramNickname = ref('');
const profession = ref('');
const workplace = ref('');
const experienceInStartups = ref('');
const fromYouKnow = ref('');
const beenEarly = ref('');
const fromWhichCity = ref('');
const email = ref('');
const personaldataAgree = ref(false);
const feeAgree = ref(false);

const submitAvailable = computed(() => {
	return [
		name.value,
		telegramNickname.value,
		profession.value,
		workplace.value,
		experienceInStartups.value,
		fromYouKnow.value,
		beenEarly.value,
		fromWhichCity.value,
		email.value,
		personaldataAgree.value,
		feeAgree.value
	].every((a) => !!a);
});

const getLastInfo = () => {
	const lastInfo = localStorage.getItem('REGISTRATION_DATA');
	if (!lastInfo) {
		return;
	}

	const parsedInfo = JSON.parse(lastInfo);
	if (!parsedInfo.eventId) {
		return;
	}

	name.value = parsedInfo.name;
	telegramNickname.value = parsedInfo.telegramNickname;
	profession.value = parsedInfo.profession;
	workplace.value = parsedInfo.workplace;
	experienceInStartups.value = parsedInfo.experienceInStartups;
	fromYouKnow.value = parsedInfo.fromYouKnow;
	beenEarly.value = parsedInfo.beenEarly;
	fromWhichCity.value = parsedInfo.fromWhichCity;
	email.value = parsedInfo.email;
};

try {
	getLastInfo();
} catch (e) {
	console.error(e);
}

const submitInfo = computed(() => {
	return <Registration>{
		eventId: props.eventId,
		telegramNickname: telegramNickname.value,
		name: name.value,
		profession: profession.value,
		workplace: workplace.value,
		experienceInStartups: experienceInStartups.value,
		fromYouKnow: fromYouKnow.value,
		beenEarly: beenEarly.value,
		fromWhichCity: fromWhichCity.value,
		email: email.value,
		personaldataAgree: personaldataAgree.value,
		feeAgree: feeAgree.value
	};
});

const submit = async () => {
	if (!submitAvailable.value) {
		return;
	}

	await sendFormAboutRegistration(submitInfo.value).then(() =>
		router.push(`/payment/${submitInfo.value.eventId}`)
	);
};

const closeModal = () => {
	props.close();
};
</script>

<template>
	<CommonModalWrapper>
		<div class="modal-card form">
			<div class="modal-card__head">
				<h2 class="modal-card__title">
					{{ 'Регистрация' }}
				</h2>
			</div>
			<div class="modal-card__body body">
				<div class="form-fields">
					<CommonInput
						v-model="name"
						input-type="input"
						input-name="name"
						input-placeholder="Name, Surname (for a badge, in Latin)"
					/>
					<CommonInput
						v-model="telegramNickname"
						input-type="input"
						input-name="telegramNickname"
						input-placeholder="Telegram (in @nickname format) - for communication"
					/>
					<CommonInput
						v-model="profession"
						input-type="input"
						input-name="profession"
						input-placeholder="Profession (for a badge, no more than 24 characters, including spaces)"
					/>
					<CommonInput
						v-model="workplace"
						input-type="input"
						input-name="workplace"
						input-placeholder="Workplace"
					/>
					<CommonInput
						v-model="experienceInStartups"
						input-type="datalist"
						input-name="experienceInStartups"
						input-placeholder="Have you ever worked in startups?"
						:options-list="['Yes', 'Nope']"
					/>
					<CommonInput
						v-model="fromYouKnow"
						input-type="datalist"
						input-name="from"
						input-placeholder="How did you know about us?"
						:options-list="[
							'Twitter',
							'Instagram',
							'From friends',
							'Telegram',
							'LinkedIn'
						]"
					/>
					<CommonInput
						v-model="beenEarly"
						input-type="datalist"
						input-name="beenEarly"
						input-placeholder="Have you been to our meetups before?"
						:options-list="['Nope', 'Yes, once', 'Yes, more than once']"
					/>
					<CommonInput
						v-model="fromWhichCity"
						input-type="input"
						input-name="fromWichCity"
						input-placeholder="From which city will you go to the meetup?"
					/>
					<CommonInput
						v-model="email"
						input-type="input"
						input-name="email"
						input-placeholder="E-mail address"
					/>
				</div>
			</div>
			<ul class="form-agreements-list">
				<li class="form-agreements-item">
					<input
						id="personaldata"
						v-model="personaldataAgree"
						type="checkbox"
						name="personaldata"
					/>
					<label
						class="form-agreements-item__label"
						for="personaldata"
						>I agree to the processing of personal data
					</label>
				</li>
				<li class="form-agreements-item">
					<input
						id="fee"
						v-model="feeAgree"
						type="checkbox"
						name="fee"
					/>
					<label
						class="form-agreements-item__label"
						for="fee"
					>
						I understand that I will have to pay the entrance fee.
					</label>
				</li>
			</ul>
			<div class="modal-card__foot">
				<CommonButton
					class="modal-card__button"
					button-class="button__success"
					:button-text="$translate('component.new_event_modal.submit')"
					@click="submit()"
				/>
				<CommonButton
					class="modal-card__button"
					button-class="button__ordinary"
					:button-text="$translate('component.new_event_modal.cancel')"
					@click="closeModal()"
				/>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style lang="less" scoped>
.modal-card {
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: auto;
	align-items: center;
	gap: var(--space-unrelated-items);
	background: var(--color-white);

	&__head,
	&__foot {
		width: 100%;
		display: flex;
		justify-content: center;
	}
}

.body {
	overflow-y: auto;
	padding: 20px var(--padding-side);
}

.form {
	&-fields,
	&-agreements-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-related-items);
		align-items: center;
	}

	&-agreements-item {
		display: flex;
		align-items: center;
		gap: var(--space-related-items);

		&__label {
			font-size: var(--font-size-XS);
			line-height: var(--line-height-XS);
		}
	}
}

.submit-button {
	color: var(--color-white);
	background: var(--color-accent-green-main);
	height: 40px;
	width: 100%;
	border-radius: 6px;
	padding: 7px 16px 7px 16px;
	justify-content: center;
}

main {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12px;
}
</style>
