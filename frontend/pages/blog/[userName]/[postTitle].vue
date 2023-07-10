<script setup lang="ts">
import { posts } from '../../../../common/blog/posts';

const route = useRoute();
const router = useRouter();
const userName = route.params.userName as string;
if (!userName || !['AfishaPeredelano'].includes(userName)) {
	router.push({ name: '/blog/AfishaPeredelano' });
}

const postTitle = route.params.postTitle as string;
if (!postTitle) {
	router.push({ name: '/blog/AfishaPeredelano' });
}

const post = posts.find((post) => post.title === postTitle);
if (!post) {
	router.push({ name: '/blog/AfishaPeredelano' });
	throw new Error('Post not found');
}

const description = `${postTitle} Статья из блога компании AfishaPeredelano, котороая делает афишу, чтобы объединять людей вокруг эвентов в Сербии`;

useSeoMeta({
	title: postTitle,
	ogTitle: postTitle,
	description,
	ogDescription: description
});
</script>

<template>
	<div class="blog">
		<h1>{{ post.title }}</h1>

		<p class="post-body">{{ post.body }}</p>
		<div class="support-info">
			<p>{{ post.date }}</p>
			<NuxtLink
				to="/about"
				class="link"
				>AfishaPeredelano</NuxtLink
			>
		</div>
		<ul class="see-also">
			<h2>Смотрите также:</h2>
			<li class="see-also__item">
				<NuxtLink
					to="/blog/AfishaPeredelano"
					class="link"
					>Блог AfishaPeredelano</NuxtLink
				>
			</li>
			<li
				v-for="post of posts.slice(0, 4)"
				v-bind:key="post.title"
				class="see-also__item"
			>
				<NuxtLink
					:to="`/blog/AfishaPeredelano/${post.title}`"
					class="link"
					>{{ post.title }}</NuxtLink
				>
			</li>
		</ul>
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
	white-space: pre-wrap;
}

.support-info {
	display: flex;
	justify-content: space-between;
	opacity: 0.5;
	padding: 10px;
}

.see-also {
	padding: 20px;
}

.see-also__item {
	list-style: inside;
}
</style>
