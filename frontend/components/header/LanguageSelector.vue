<script setup lang="ts">
import { supportedLocales } from '../../i18n';

const { locale, setLocale } = useI18n();
const language = ref(locale.value);

watch(language, (lang) => {
	setLocale(lang);
});
</script>

<template>
	<label>
		{{ $t('modal.language_selector.label') }}
		<select v-model="language">
			<option
				v-for="loc in supportedLocales"
				:key="`select-locale-${loc}`"
				:value="loc"
			>
				{{ loc }}
			</option>
		</select>
	</label>
</template>
