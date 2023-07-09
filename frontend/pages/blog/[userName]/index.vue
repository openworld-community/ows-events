<script setup lang="ts">
import { posts } from '../../../../common/blog/posts';

useSeoMeta({
	title: 'Блог АфишаПеределано',
	ogTitle: 'Блог АфишаПеределано',
	description:
		'Блог компании AfishaPeredelano, котороая делает афишу, чтобы объединять людей вокруг эвентов в Сербии',
	ogDescription:
		'Блог компании AfishaPeredelano, котороая делает афишу, чтобы объединять людей вокруг эвентов в Сербии'
});

const route = useRoute();
const router = useRouter();
const userName = route.params.userName as string;
if (!userName || !['AfishaPeredelano'].includes(userName)) {
	router.push({ name: '/blog/AfishaPeredelano' });
}
</script>

<template>
	<div class="blog">
		<h1>Блог {{ userName }}</h1>
		<article
			v-for="post of posts"
			:key="post.body"
			class="post"
		>
			<h2 class="post-header">{{ post.title }}</h2>
			<p class="post-body">{{ post.body }}</p>
			<NuxtLink
				:to="`/blog/AfishaPeredelano/${post.title}`"
				class="link"
				>Читать полностью...</NuxtLink
			>
			<div class="support-info">
				<p>{{ post.date }}</p>
				<NuxtLink
					to="/about"
					class="link"
					>AfishaPeredelano</NuxtLink
				>
			</div>
		</article>
	</div>
</template>

<style scoped>
.blog {
	display: flex;
	flex-direction: column;
	gap: 30px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.161);
	padding-top: 20px;
	padding-bottom: 20px;
}

.post {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.post-header {
	padding-left: 20px;
}

.post-body {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

}

.support-info {
	display: flex;
	justify-content: space-between;
	opacity: 0.5;
	padding: 10px;
}
</style>
