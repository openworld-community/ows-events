<script setup lang="ts">
import type { NuxtError } from '#app'
import { RoutePathEnum } from '~/constants/enums/route';
import { CookieNameEnum } from './constants/enums/common';
import type { UserInfoWithId } from './../common/types/user';
import { TOKEN_MAX_AGE_SECONDS } from './constants/defaultValues/time';
const langCookie = useCookie(CookieNameEnum.LOCALE);

const props = defineProps({
	error: Object as () => NuxtError
}
)
const handleError = () => clearError ({redirect: '/ru'})
//const error = useError();
const localePath = useLocalePath();

definePageMeta({
	middleware: async (to, from) => {
		const userToken = getFirstParam(to.params.id);
		useCookie<string>(CookieNameEnum.TOKEN, { maxAge: TOKEN_MAX_AGE_SECONDS }).value =
			userToken;
		const { data: user } = await apiRouter.user.get.useQuery({ data: { userToken } });
		if (!user.value) {
			console.error('No user data retrieved');
			return;
		}
		useCookie<UserInfoWithId | null>(CookieNameEnum.TG_USER, {
			maxAge: TOKEN_MAX_AGE_SECONDS
		}).value = user.value;
	}
});
</script>
<template>
	<NuxtLayout>
		<div class="service-error">
			<template v-if="error.statusCode === 404">
				<div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;"></div>
				<h1>404 ERROR!</h1>
				<p><strong>Error code: {{ error.statusCode }}{{ error.message }}</strong></p>				
			</template>
			<template v-else>
				<h1>OTHER ERROR</h1>
				<p>
					<strong>Error code: {{ error.statusCode }}</strong>
				</p>
			</template>
			<p>
				<NuxtLink @click="handleError" >HOME</NuxtLink>
			</p>
		</div>
	</NuxtLayout>
</template>
