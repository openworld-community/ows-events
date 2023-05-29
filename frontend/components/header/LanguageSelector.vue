<script setup lang="ts">
import { watch } from 'vue';
import { supportedLocales } from '@/i18n';
import { ref } from 'vue';

const { $i18n } = useNuxtApp();
const language = ref($i18n.language);
watch(language, (language) => $i18n.changeLanguage(language));
</script>

<template>
	<label>
		{{ $translate('component.language_selector.label') }}
		<select v-model="language">
			<option
				v-for="locale in supportedLocales"
				:key="`select-locale-${locale}`"
				:value="locale"
				:selected="locale === language"
			>
				{{ locale }}
			</option>
		</select>
	</label>
</template>
