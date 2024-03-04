<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup';
import { SUPPORT_TG_URL } from '~/constants/url';

const { t } = useI18n()

const inputType = ref<'password' | 'text'>('password')

const { meta, handleSubmit, handleReset } = useForm({
    validationSchema: yup.object({
        email: yup
            .string()
            // подробности по регексу в ~/components/event/eventValidationSchema
            .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
                excludeEmptyString: true,
                message: t('errors.INVALID_EMAIL')
            })
            .required(t('errors.REQUIRED_FIELD'))
            .trim(),
        password: yup
            .string()
            .required(t('errors.REQUIRED_FIELD'))
            .min(4, t('errors.PASSWORD_TOO_SHORT'))
            .max(24, t('errors.PASSWORD_TOO_LONG')),
    })
});

const emailField = useField<string>(() => 'email', {
    validateOnModelUpdate: false
});
const passwordField = useField<string>(() => inputType.value, {
    validateOnModelUpdate: false
});

const onSubmit = handleSubmit(async values => {
    try {
        const { email, password } = values

        const { error, data } = await apiRouter.auth.login.useQuery({ data: { email, password } })
        if (error.value) {
            console.log('error', error.value);
            return
        }
        navigateTo(data.value, { external: true })
    } catch (error) {
        console.log(error);
    } finally {
        handleReset()
    }
});
</script>

<template>
    <form
        class="signin"
        @submit.prevent="onSubmit"
    >
        <fieldset class="signin__fieldset">
            <CommonFormField
                :error="emailField.meta.touched && Boolean(emailField.errorMessage.value)
                    ? emailField.errorMessage.value
                    : ''"
                :touched="emailField.meta.touched"
                :error-label="true"
            >
                <CommonUiBaseInput
                    v-model="emailField.value.value"
                    :placeholder="$t('form.form.email')"
                    class="signin__fieldset--input"
                    autocomplete="true"
                    name="email"
                    type="email"
                />
            </CommonFormField>
            <CommonFormField
                :error="passwordField.meta.touched && Boolean(passwordField.errorMessage.value)
                    ? emailField.errorMessage.value
                    : ''"
                :touched="passwordField.meta.touched"
                :error-label="true"
            >
                <CommonUiBaseInput
                    v-model="passwordField.value.value"
                    :placeholder="$t('form.form.password')"
                    class="signin__fieldset--input"
                    name="password"
                    :type="inputType"
                    :show-password="true"
                />
            </CommonFormField>
        </fieldset>
        <CommonButton
            class="signin__submit"
            button-kind="dark"
            :is-disabled="!meta.touched && !meta.valid"
            :button-text="$t('form.form.login')"
            type="submit"
        />
        <NuxtLink
            :to="SUPPORT_TG_URL"
            target="_blank"
            class="navigation__link"
        >
            {{ $t('form.form.forgotPassword') }}
        </NuxtLink>
    </form>
</template>

<style lang="less" scoped>
.navigation__link {
    text-align: center;
    font-size: var(--font-size-M);
    line-height: 24px;
    color: var(--color-input-icons);
    padding: var(--space-inner) var(--space-related-items);
    margin: 0 auto;

    transition: color 0.3s ease;

    &:hover,
    &:focus {
        color: var(--color-text-secondary);
    }

    &:active {
        color: var(--color-text);
    }
}

.signin {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    width: 75%;

    @media (max-width: 1200px) {
        width: 100%;
    }

    &__fieldset {
        border: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;

        &--input {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &__submit {
        width: 189px;
        align-self: center;
    }
}
</style>