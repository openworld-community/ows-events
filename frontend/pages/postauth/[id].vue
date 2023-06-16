<script setup lang="ts">
import { RouteNameEnum } from '~/constants/enums/route';
import type { UserInfo } from '../../../common/types/user';
definePageMeta({
	middleware: async () => {
		const route = useRoute();
		const userToken = getFirstParam(route.params.id);
		const userCookie = useCookie<UserInfo | null>('user');
		const tokenCookie = useCookie<string>('token');
		tokenCookie.value = userToken;
		const { data: user } = await apiRouter.auth.getUser.useQuery({ userToken });
		if (!user.value) {
			console.error('No user data retrieved');
		} else {
			userCookie.value = user.value;
		}
	}
});
await navigateTo({ name: RouteNameEnum.HOME });
</script>
