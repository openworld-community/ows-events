<script setup lang="ts">
import type { Registration } from '../../../common/types/registration';

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
	apiRouter.events.registration.add.useMutation({
		data: { registration: submitInfo.value },
		opts: {
			async onResponse() {
				// TODO добавить запись в localStorage для формы ивента (by Emilia)
				localStorage.setItem('REGISTRATION', 'true');
				localStorage.setItem('REGISTRATION_DATA', JSON.stringify(submitInfo.value));
				await navigateTo(`/payment/${submitInfo.value.eventId}`);
			}
		}
	});
};

const closeModal = () => {
	props.close();
};
</script>

<template>
	<CommonModalWrapper title="Регистрация">
		<template #form>
			<CommonInput
				v-model="name"
				input-type="input"
				input-name="name"
				input-placeholder="How should we call you? (for a badge, in Latin)"
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
				input-name="fromWhichCity"
				input-placeholder="From which city will you go to the meetup?"
			/>
			<CommonInput
				v-model="email"
				input-type="input"
				input-name="email"
				input-placeholder="E-mail address"
			/>
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
		</template>

		<template #footer>
			<CommonButton
				class="modal-card__button"
				button-kind="ordinary"
				:button-text="$t('modal.new_event_modal.cancel')"
				@click="closeModal"
			/>
			<CommonButton
				class="modal-card__button"
				button-kind="success"
				:button-text="$t('modal.new_event_modal.submit')"
				@click="submit"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style lang="less" scoped>
</style>
