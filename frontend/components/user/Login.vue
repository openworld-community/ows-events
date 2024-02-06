<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup';
import { RoutePathEnum } from '~/constants/enums/route';
import { SUPPORT_TG_URL } from '~/constants/url';

const { t } = useI18n()

const localePath = useLocalePath()

const inputType = ref<'password' | 'text'>('password')

const { errors, defineField, handleSubmit, handleReset } = useForm({
    validationSchema: yup.object({
        email: yup
            .string()
            .email(t('errors.INVALID_EMAIL'))
            .required(t('errors.REQUIRED_FIELD'))
            .trim(),
        password: yup
            .string()
            .required(t('errors.REQUIRED_FIELD'))
            .min(4, t('errors.PASSWORD_TOO_SHORT'))
            .max(24, t('errors.PASSWORD_TOO_LONG')),
    })
});

const [email, emailAttr] = defineField('email', {
    validateOnModelUpdate: false,
    validateOnBlur: true
})
const [password, passwordAttr] = defineField('password', {
    validateOnModelUpdate: false,
    validateOnBlur: true
})

const onSubmit = handleSubmit(async values => {
    try {
        // alert(JSON.stringify(values, null, 2));
        const { email, password } = values
        const { error } = await apiRouter.auth.login.useQuery({ data: { email, password } })
        if (error.value) {
            console.log('error', error.value);
            return
        }
        navigateTo(localePath(RoutePathEnum.HOME))
    } catch (error) {
        console.log(error);
    } finally {
        handleReset()
    }
});

const notEmptyFields = computed(() => {
    return email.value && password.value ? true : false
})
</script>

<template>
    <form
        class="signin"
        @submit.prevent="onSubmit"
    >
        <fieldset class="signin__fieldset">
            <CommonUiBaseInput
                v-model="email"
                v-bind="emailAttr"
                class="signin__fieldset--input"
                name="email"
                type="email"
                autocomplete="true"
                placeholder="E-mail"
                :error-label="true"
                :error="errors.email"
            />
            <CommonUiBaseInput
            v-model="password"
                v-bind="passwordAttr"
                class="signin__fieldset--input"
                name="password"
                :type="inputType"
                autocomplete="true"
                :show-password="true"
                :error="errors.password"
                :error-label="true"
                placeholder="Password"
            />
        </fieldset>
        <CommonButton
            class="signin__submit"
            :is-disabled="!notEmptyFields"
            button-kind="dark"
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