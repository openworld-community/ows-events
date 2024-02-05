<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup';
import { RoutePathEnum } from '~/constants/enums/route';

const { t } = useI18n()

const localePath = useLocalePath()

const inputType = ref<'password' | 'text'>('password')

const { errors, defineField, meta, handleSubmit, handleReset } = useForm({
    // temporary local validation
    validationSchema: yup.object({
        email: yup
            .string()
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

const [email, emailAttr] = defineField('email')
const [password, passwordAttr] = defineField('password')
const [confirmPassword, confirmPasswordAttr] = defineField('confirmPassword')

const onSubmit = handleSubmit(async values => {
    try {
        // alert(JSON.stringify(values, null, 2));
        const { email, password } = values
        const { error } = await apiRouter.auth.signup.useQuery({ data: { email, password } })
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
</script>
 
<template>
    <form
        class="signup"
        @submit.prevent="onSubmit"
    >
        <fieldset class="signup__fieldset">
            <CommonUiBaseInput
                v-model="email"
                v-bind="emailAttr"
                class="signup__fieldset--input"
                name="email"
                type="email"
                autocomplete="true"
                :error="errors.email"
                :error-label="true"
                placeholder="E-mail"
            />
            <CommonUiBaseInput
                v-model="password"
                v-bind="passwordAttr"
                class="signup__fieldset--input"
                name="password"
                :type="inputType"
                autocomplete="true"
                :show-password="true"
                :error="errors.password"
                :error-label="true"
                placeholder="Password"
            />
            <CommonUiBaseInput
                v-model="confirmPassword"
                v-bind="confirmPasswordAttr"
                class="signup__fieldset--input"
                name="confirm-password"
                :type="inputType"
                :show-password="true"
                :error="errors.confirmPassword"
                :error-label="true"
                placeholder="Confirm password"
            />
        </fieldset>
        <CommonButton
            class="signup__submit"
            :is-disabled="!meta.valid"
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
    gap: 30px;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 75%;

    @media (max-width: 768px) {
        width: 100%;
    }

    &__fieldset {
        border: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
    }

    &__submit {
        width: 189px;
        align-self: center;
    }
}
</style>