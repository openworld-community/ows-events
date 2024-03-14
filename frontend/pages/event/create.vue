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
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo quod quas maxime
				nostrum facere veritatis temporibus voluptas error deserunt, nobis, illum commodi,
				natus nesciunt ex pariatur reiciendis laudantium modi adipisci? Lorem ipsum dolor
				sit amet consectetur adipisicing elit. Aliquam aut officia repellendus id ad,
				eligendi quibusdam distinctio incidunt in recusandae, eos fugiat? In amet sunt
				voluptatem repudiandae maiores laboriosam, nam esse, ut eum omnis ipsam aliquam
				dolorum recusandae labore laborum blanditiis unde eligendi debitis, numquam et
				reprehenderit cumque. Nisi culpa hic dicta recusandae repellendus illum itaque
				obcaecati saepe numquam, incidunt unde blanditiis id, qui asperiores inventore esse
				fugit temporibus odit vitae iste similique? Corporis distinctio totam dignissimos
				ex, modi quo rerum, labore id illum itaque incidunt quia consequuntur quos animi
				natus amet, ut sequi. Accusamus magnam omnis laudantium atque nobis nemo accusantium
				sed placeat cum. Cupiditate culpa ad explicabo nemo eum. Rem nam quibusdam aliquid
				magnam corrupti nulla laborum blanditiis eligendi ea! Sunt voluptatem voluptate in
				cupiditate eveniet vero cum ipsa nesciunt tenetur quia iusto omnis doloribus quasi
				corrupti aspernatur error quidem delectus distinctio, dolorum adipisci accusamus
				repellat nisi ratione esse? Officiis, nihil quos animi voluptas amet totam cum in
				nobis harum quisquam assumenda exercitationem veniam, unde eius! Explicabo,
				molestias quis? Veritatis ullam pariatur iste. Qui reprehenderit sapiente incidunt
				vel quia est laboriosam perspiciatis iste laborum voluptates corrupti aliquid, a
				minus cum voluptas at nam consequuntur, aperiam natus dolorum? Voluptas.
			</template>
		</LibraryDownsheet>
	</div>
</template>
