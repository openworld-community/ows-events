<script setup lang="ts">
import { RouteNameEnum } from '~/constants/enums/route';
import type { UserInfo } from '../../../common/types/user';

definePageMeta({
	middleware: async () => {
		const route = useRoute();
		const userToken = getFirstParam(route.params.id);
		useCookie<string>('token').value = userToken;
		const { data: user } = await apiRouter.auth.getUser.useQuery({ data: { userToken } });
		if (!user.value) {
			console.error('No user data retrieved');
			return;
		}
		useCookie<UserInfo | null>('user').value = user.value;
	}
});
await navigateTo({ name: RouteNameEnum.USER_PAGE });
</script>
