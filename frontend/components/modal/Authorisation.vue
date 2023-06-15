<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';

type Props = {
	close: () => void;
	isAuthorized: boolean;
	deauthorize: () => void;
};

const props = defineProps<Props>();
const userCookie = useCookie<UserInfo | null>('user');

const username =
	userCookie.value?.username ||
	userCookie.value?.first_name ||
	userCookie.value?.last_name ||
	null;

// const temporaryId = v4();
// const authLink: string = `${AUTH_SERVER_URL}/auth/${temporaryId}?encodede_backurl=${encodeURIComponent(
// 	`${SERVER_URL}/postauth/${temporaryId}`
// )}`;

const onTelegramAuth = (user: any) => {
	alert(
		'Logged in as ' +
			user.first_name +
			' ' +
			user.last_name +
			' (' +
			user.id +
			(user.username ? ', @' + user.username : '') +
			')'
	);
};
const telegram = ref<HTMLElement | null>(null);
onMounted(() => {
	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://telegram.org/js/telegram-widget.js?22';

	script.setAttribute('data-size', 'large');
	// script.setAttribute('data-userpic', props.userpic);
	script.setAttribute('data-telegram-login', 'afisha_oauth_local_bot');
	script.setAttribute('data-request-access', 'write');

	script.setAttribute('data-auth-url', 'http://127.0.0.1:7080/api/auth/telegram');
	telegram.value?.appendChild(script);
	console.log(telegram.value);
});
</script>

<template>
	<!--  TODO костылище, пока у нас нет финального макета-->
	<CommonModalWrapper
		:hide-overlay="false"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="false"
	>
		<div class="modal">
			<div class="modal-card__head">
				<p class="modal-card__title">
					{{
						isAuthorized
							? username
							: $translate('component.pre_authorisation_modal.title')
					}}
				</p>
			</div>
			<div class="modal-card__foot">
				<div ref="telegram"></div>
				<CommonButton
					class="modal-card__cancel-button"
					button-kind="ordinary"
					:button-text="$translate('component.pre_authorisation_modal.button.cancel')"
					@click="props.close()"
				/>
				<CommonButton
					v-if="isAuthorized"
					button-kind="success"
					:button-text="$translate('component.pre_authorisation_modal.button.logout')"
					class="modal-card__logout-button"
					@click="props.deauthorize()"
				/>

				<CommonButton
					v-else
					:link="authLink"
					is-external-link
					class="modal-card__login-button"
					button-kind="success"
					:button-text="$translate('component.pre_authorisation_modal.button.login')"
					@click="onTelegramAuth"
				/>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.modal {
	//TODO: пока верстка только мобилки
	max-width: 350px;
	overflow: hidden;
	border-radius: 10px;
	margin: 40vh auto auto;
}

.modal-card {
	&__head {
		height: max-content;
		justify-content: center;
	}

	&__foot {
		padding: 12px 57px;
		justify-content: center;
	}

	&__cancel-button {
		padding: 7px 16px;
		margin-right: 8px;
	}

	&__logout-button {
		padding: 7px 23px;
	}

	&__login-button {
		padding: 7px 23px;
	}
}

.authorisation-button {
	display: flex;
	flex-direction: column;
	width: max-content;
	justify-content: center;
	align-items: center;
	//position: absolute;
	//top: var(--header-height);
	//right: var(--padding-side);
	background-color: var(--color-white);
	box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02);
	border-radius: 6px;
	padding: 8px 16px;

	&__container {
		display: flex;
	}

	&__text {
		margin-right: 9px;
	}

	&__user {
		font-size: var(--font-size-XS);
		color: var(--color-text-secondary);
	}

	&__icon {
		color: var(--color-input-field);
	}
}
</style>
