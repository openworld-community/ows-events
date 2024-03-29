<script setup lang="ts">
import type { NuxtError } from '#app'
import { RoutePathEnum } from '~/constants/enums/route';
import { CookieNameEnum } from './constants/enums/common';
// import type { UserInfoWithId } from './../common/types/user';
// import { TOKEN_MAX_AGE_SECONDS } from './constants/defaultValues/time';
const langCookie = useCookie(CookieNameEnum.LOCALE);

var magic = navigator.language.substring(0, 2);

const localePath = useLocalePath();

const props = defineProps({
	error: Object as () => NuxtError
}
)
 
const handleError = () => clearError ({redirect: langCookie.value ?? 'ru'})


// definePageMeta({
// 	middleware: async (to, from) => {
// 		const userToken = getFirstParam(to.params.id);
// 		useCookie<string>(CookieNameEnum.TOKEN, { maxAge: TOKEN_MAX_AGE_SECONDS }).value =
// 			userToken;
// 		const { data: user } = await apiRouter.user.get.useQuery({ data: { userToken } });
// 		if (!user.value) {
// 			console.error('No user data retrieved');
// 			return;
// 		}
// 		useCookie<UserInfoWithId | null>(CookieNameEnum.TG_USER, {
// 			maxAge: TOKEN_MAX_AGE_SECONDS
// 		}).value = user.value;
// 	}
// });
await navigateTo(localePath(RoutePathEnum.HOME, langCookie.value ?? 'ru')) //navigateTo(localePath(RoutePathEnum.HOME, userLanguage));


</script>
<template>
	<NuxtLayout>
		<div class="service-error">
			<template v-if="error.statusCode === 404">
				<div class="page-error"></div>
				<p><strong>Error code: {{ error.statusCode }}</strong></p>
								
			</template>
			<template v-else>
				<h1>OTHER ERROR</h1>
				<p>
					<strong>Error code: {{ error.statusCode }}</strong>
				</p>
			</template>
			<p>
				<NuxtLink @click="handleError" class="go-home">{{$t('errors.ERROR_PAGE_GO_HOME')}}</NuxtLink>
			</p>
			<!-- <CommonButton
			
				link=nav
				class="navigation-menu-mobile__edit-button"
				button-kind="ordinary"
				:button-text="$t('errors.ERROR_PAGE_GO_HOME')"
				icon-name="edit"
			/> -->

		</div>
	</NuxtLayout>
</template>
<style scoped lang="less">
.service-error{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.page-error{
	width: 500px;
	height: 500px;
	background-image: url(@/assets/img/error/error-404.png); /* путь к изображению */
    background-size: contain; /* изображение будет масштабироваться, чтобы покрыть всю область фона блока */
    background-repeat: no-repeat;

}
.go-home{
	color: forestgreen;
	font-weight: 500;
}
</style>
