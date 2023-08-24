<script setup lang="ts">
import { RouteNameEnum } from '~/constants/enums/route';
import { TOKEN_MAX_AGE_SECONDS } from '../../constants/defaultValues/time';

definePageMeta({
	middleware: async () => {
		const route = useRoute();
		const userToken = getFirstParam(route.params.id);
		useCookie<string>('token', { maxAge: TOKEN_MAX_AGE_SECONDS }).value = userToken;
	}
});
await navigateTo({ name: RouteNameEnum.USER_PAGE });
</script>
