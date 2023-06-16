<script setup lang="ts">
import { RouteNameEnum } from '~/constants/enums/route';
import type { UserInfo } from '../../../common/types/user';
definePageMeta({
	middleware: async () => {
		const route = useRoute();
		const userID = getFirstParam(route.params.id);
		const { data: token } = await apiRouter.auth.getToken.useQuery({
			data: { id: userID }
		});
		if (!token.value) return;

		const tokenCookie = useCookie<string>('token');
		tokenCookie.value = token.value;
		const { data: user } = await apiRouter.auth.getUser.useQuery({
			data: { userToken: token.value }
		});
		if (!user.value) return;

		const userCookie = useCookie<UserInfo | null>('user');
		userCookie.value = user.value;
	}
});
await navigateTo({ name: RouteNameEnum.HOME });
</script>
