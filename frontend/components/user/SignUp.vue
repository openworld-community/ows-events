<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup';

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
        confirmPassword: yup
            .string()
            .required(t('errors.REQUIRED_FIELD'))
            .oneOf([
                yup.ref('password')
            ],
                t('errors.PASSWORD_MISMATCH'))
    })
});

const emailField = useField<string>(() => 'email', {
    validateOnModelUpdate: false
});
const passwordField = useField<string>(() => 'password', {
    validateOnModelUpdate: false
});
const passwordConfField = useField<string>(() => 'confirmPassword', {
    validateOnModelUpdate: false
});

const onSubmit = handleSubmit(async values => {
    try {
        const { email, password } = values
        const { error, data } = await apiRouter.auth.signup.useQuery({ data: { email, password } })
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
        class="signup"
        @submit.prevent="onSubmit"
    >
        <fieldset class="signup__fieldset">
            <CommonFormField
                :error="emailField.errorMessage.value"
                :touched="emailField.meta.touched"
                :error-label="true"
            >
                <CommonUiBaseInput
                    v-model="emailField.value.value"
                    :placeholder="$t('form.form.email')"
                    class="signup__fieldset--input"
                    autocomplete="true"
                    name="email"
                    type="email"
                    :error="emailField.meta.touched && Boolean(emailField.errorMessage.value)
                        ? emailField.errorMessage.value
                        : false"
                />
            </CommonFormField>
            <CommonFormField
                :error="passwordField.errorMessage.value"
                :touched="passwordField.meta.touched"
                :error-label="true"
            >
                <CommonUiBaseInput
                    v-model="passwordField.value.value"
                    :placeholder="$t('form.form.password')"
                    class="signup__fieldset--input"
                    name="password"
                    :type="inputType"
                    :show-password="true"
                    :error="passwordField.meta.touched && Boolean(passwordField.errorMessage.value)
                        ? passwordField.errorMessage.value
                        : false"
                />
            </CommonFormField>
            <CommonFormField
                :error="passwordConfField.errorMessage.value"
                :touched="passwordConfField.meta.touched"
                :error-label="true"
            >
                <CommonUiBaseInput
                    v-model="passwordConfField.value.value"
                    :placeholder="$t('form.form.confirmPassword')"
                    class="signup__fieldset--input"
                    name="password"
                    :type="inputType"
                    :show-password="true"
                    :error="passwordConfField.meta.touched && Boolean(passwordConfField.errorMessage.value)
                        ? passwordConfField.errorMessage.value
                        : false"
                />
            </CommonFormField>
        </fieldset>
        <CommonButton
            class="signup__submit"
            :is-disabled="!meta.touched && !meta.valid"
            button-kind="dark"
            :button-text="$t('form.form.signup')"
            type="submit"
        />
    </form>
</template>

<style lang="less" scoped>
.signup {
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