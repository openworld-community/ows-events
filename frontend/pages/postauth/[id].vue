<script setup lang="ts">
import { RouteNameEnum } from '~/constants/enums/route';
import type { UserInfo } from '../../../common/types/user';
definePageMeta({
	middleware: async () => {
		const route = useRoute();
		const userToken = getFirstParam(route.params.id);
		useCookie<string>('token', { maxAge: 60 * 60 * 24 * 30 }).value = userToken;
		const { data: user } = await apiRouter.auth.getUser.useQuery({ data: { userToken } });
		if (!user.value) {
			console.error('No user data retrieved');
			return;
		}
		useCookie<UserInfo | null>('user', { maxAge: 60 * 60 * 24 * 30 }).value = user.value;
	}
});
await navigateTo({ name: RouteNameEnum.HOME });
</script>
