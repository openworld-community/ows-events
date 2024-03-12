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
		<div style="width: 100px; height: 20px; background-color: brown">
			<LibraryDialog2
				:dialogTitleText="titleText"
				:dialogDescriptionText="descriptionText"
				:dialogCustomFunction="handleDialogClose"
			/>
		</div>

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
	</div>
</template>
