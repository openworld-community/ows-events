<script setup lang="ts">
const open = ref(false);
const titleText = 'Logout';
const descriptionText = "Are you're shure that you want to leave us?";
const handleDialogClose = () => {
	// Ваша логика при закрытии диалога
	console.log('Dialog closed!');
};

const alert = () => {
	// Ваша логика при закрытии диалога
	console.log('Alert closed!');
};

const success = () => {
	open.value = true;
	setTimeout(() => {
		open.value = false;
	}, 2000);
};
</script>

<template>
	<div style="padding: 10px; height: 100dvh; display: flex; flex-direction: column; gap: 20px">
		<div>-------------Dialog--------------------</div>

		<LibraryAlert
			title="Are you shure?"
			description-text="You are going to logout"
			@on-confirm="alert"
		>
			<span style="color: black"> press </span>
		</LibraryAlert>

		<CommonButton
			button-text="Yes"
			class="event-form__button"
			button-kind="success"
			@click="success"
		/>
		<LibrarySuccess
			:open-dialog="open"
			title="Success!"
			description-text="Event successfuly created"
		>
			<span style="color: black"> open </span>
		</LibrarySuccess>

		<LibraryDownsheet>
			<template #trigger><span style="color: black"> press </span></template>
			<template #content>
				<DialogTitle>jhbbkjb</DialogTitle>
				<DialogDescription>jhgjkggjk</DialogDescription>
				<DialogClose as-child>
					<CommonButton
						:button-text="$t('global.button.cancel')"
						class="event-form__button"
						button-kind="ordinary"
					/>
				</DialogClose>
				<DialogClose as-child>
					<CommonButton
						button-text="Yes"
						class="event-form__button"
						button-kind="success"
						@click="emit('onConfirm')"
					/>
				</DialogClose>
			</template>
		</LibraryDownsheet>
	</div>
</template>
