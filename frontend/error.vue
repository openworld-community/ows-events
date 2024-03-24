<script setup>
import { RoutePathEnum } from '@/constants/enums/route';
const error = useError();
const localePath = useLocalePath();
</script>
<template>
	<NuxtLayout>
		<div class="service-error">
			<template v-if="error.statusCode === 404">
				<h1>404 ERROR!</h1>
				<p>Sorry, that page doesn't exist.</p>
			</template>
			<template v-else>
				<h1>OTHER ERROR</h1>
				<p>
					<strong>Error message: {{ error.message }}</strong>
				</p>
				<p>
					<strong>Error code: {{ error.statusCode }}</strong>
				</p>
			</template>
			<p>
				Go back to your
				<NuxtLink :to="localePath(RoutePathEnum.HOME)">HOME </NuxtLink>
			</p>
		</div>
	</NuxtLayout>
</template>
