<script setup lang="ts">
import { RouteNameEnum } from '~/constants/enums/route';
import { TOKEN_MAX_AGE_SECONDS } from '../../constants/defaultValues/time';
import type { TGUserInfo } from '../../../common/types/user';

definePageMeta({
	middleware: async () => {
		const route = useRoute();
		const userToken = getFirstParam(route.params.id);
		useCookie<string>('token', { maxAge: TOKEN_MAX_AGE_SECONDS }).value = userToken;
		const { data: user } = await apiRouter.auth.getUser.useQuery({ data: { userToken } });
		if (!user.value) {
			console.error('No user data retrieved');
			return;
		}
		useCookie<TGUserInfo | null>('user', { maxAge: TOKEN_MAX_AGE_SECONDS }).value = user.value;
	}
});
await navigateTo({ name: RouteNameEnum.USER_PAGE });
</script>
