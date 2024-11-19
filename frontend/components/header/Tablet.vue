<script setup lang="ts"></script>

<template>
	<HeaderUiWrapper>
		<template #left>
			<HeaderUiLogo />
		</template>

		<template #right>
			<HeaderUiCreateButton />
			<HeaderLanguageSelector />
			<HeaderNavigationMobile />
		</template>
	</HeaderUiWrapper>
</template>
