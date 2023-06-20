<script setup lang="ts">
import type { UserInfo } from '../../../common/types/user';
import { TELEGRAM_AUTH_BOT_NAME, BASE_URL } from '../../constants/url';

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

const telegram = ref<HTMLElement | null>(null);

onMounted( () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://telegram.org/js/telegram-widget.js?22';

  script.setAttribute('data-size', 'large');
  script.setAttribute('data-userpic', 'false');
  script.setAttribute('data-telegram-login', TELEGRAM_AUTH_BOT_NAME);
  script.setAttribute('data-request-access', 'write');

  script.setAttribute('data-auth-url', `${BASE_URL}/api/auth/telegram`);
  telegram.value?.appendChild(script);
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
				<div
					v-else
					class="modal-card__login-button"
				>
					<div class="modal-card__login-background">
						<CommonIcon
							class="modal-card__icon"
							name="telegram"
						/>
						{{ $translate('component.pre_authorisation_modal.telegram_login') }}
					</div>
					<div
						ref="telegram"
						:class="'modal-card__telegram-button'"
					/>
				</div>
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
		position: relative;
		min-width: 231px;
		height: 40px;
		line-height: 0;
		overflow: hidden;
		cursor: pointer;

		&:hover > .modal-card__login-background {
			background-color: var(--color-accent-green-dark);
		}
	}

	&__login-background {
		width: 100%;
		background-color: var(--color-accent-green-main);
		display: flex;
		height: 40px;
		border-radius: 24px;
		padding: 7px 14px;
		align-items: center;
		color: var(--color-white);
		transition: background-color 0.3s ease;
	}

	&__icon {
		margin-right: 6px;
	}

	&__telegram-button {
		position: absolute;
		top: 0;
		left: 0;
		width: 231px;
		height: 40px;
		border-radius: 20px;
	}

	&__loader {
		background-color: #54a9eb;
		z-index: 0;
	}

	&__telegram-button {
		z-index: 1;
    // да, так надо
    opacity: 0.0000001;
	}

	&__spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
