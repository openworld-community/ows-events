<script setup lang="ts">
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTitle,
	DialogTrigger
} from 'radix-vue';

const props = defineProps(
	{
		dialogTitleText: {
			type: String,
			required: true
		},
		dialogDescriptionText: {
			type: String,
			default: ''
		},
		dialogCustomFunction:{
			type: Function,
			required:true, 
		},
		dialogCustomFunctionDescription:{
			type: String,
			default: '', 
		},
	}
)

</script>

<template>
	<DialogRoot>
		<DialogTrigger class="dialog-trigger">
			<slot/>
		</DialogTrigger>
		<DialogPortal>
			<DialogOverlay class="dialog-overlay" />
			<DialogContent class="dialog-content">
				<DialogTitle class="dialog-title">
					{{props.dialogTitleText}}
				</DialogTitle>
				<DialogDescription class="dialog-description">
					{{props.dialogDescriptionText}}
				</DialogDescription>
				
				
				<div class="dialog-buttons">
					<DialogClose as-child>
						<button class="dialog-button" @click="props.dialogCustomFunction">{{props.dialogCustomFunctionDescription}}</button>
					</DialogClose>
				</div>
				<DialogClose class="ui-dialog-close"
				>
					<CommonButton
                        is-icon
                        icon-name="close"
                        :interactive="false"
                        class="dialog-close"
						aria-label="Close"
                    />
				</DialogClose>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
</template>
<style>

.dialog-trigger {
	height: 100%;
	width: 100%;
	/* color: #59a2fc;
	font-weight: 600;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	background-color: #88f8cd;
	padding: 15px;
	display: inline-flex;
	height: 35px;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	transition: background-color 0.3s ease; */
}

/* .dialog-trigger:focus {
	box-shadow: 0 0 0 1px #22c55e;
} */

.dialog-overlay {
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 30;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.dialog-content {
	z-index: 100;
	background-color: #ffffff;
	position: fixed;
	top: 50%;
	left: 50%;
	max-height: 85vh;
	width: 90vw;
	max-width: 450px;
	transform: translate(-50%, -50%);
	border-radius: 6px;
	padding: 25px;
	box-shadow: 0 10px 38px -10px hsla(206, 22%, 7%, 0.35),
		0 10px 20px -15px hsla(206, 22%, 7%, 0.2);
	outline: none;
}

.dialog-title {
	color: #8f3985;
	margin: 0;
	font-size: 17px;
	font-weight: 600;
}

.dialog-description {
	color: #8c8c8c;
	margin-top: 10px;
	margin-bottom: 5px;
	font-size: 15px;
	line-height: normal;
}

.dialog-fieldset {
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	gap: 5px;
}

.dialog-label {
	color: #6c7887;
	width: 90px;
	text-align: right;
	font-size: 15px;
}

.dialog-input {
	color: #6c7887;
	box-shadow: 0 0 0 1px #22c55e;
	display: inline-flex;
	height: 35px;
	width: 100%;
	flex: 1;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	padding: 10px;
	font-size: 15px;
	outline: none;
}

.dialog-buttons {
	margin-top: 25px;
	display: flex;
	justify-content: flex-end;
}

.dialog-button {
	background-color: #48bb78;
	color: #1f2937;
	font-weight: 600;
	border-radius: 4px;
	padding: 15px;
	display: inline-flex;
	height: 35px;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s ease;
	outline: none;
}

.dialog-button:hover {
	background-color: #38a169;
}

.dialog-close {
	color: #6c7887;	
	position: absolute;
	top: 10px;
	right: 10px;
	display: inline-flex;
	height: 25px;
	width: 25px;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: background-color 0.3s ease;
	outline: none;
	&:hover {
		background-color: var(--color-accent-green-main-50);
	}
}

.dialog-close:hover {
	&__svg{
		color: #8f3985;
	}
	box-shadow: 0 0 0 2px #48c78e;
}
.dialog-close:focus {
	box-shadow: 0 0 0 2px #48c78e;
}

.ui-dialog-close {
	position: absolute;
	top: 10px;
	right: 10px;
	display: inline-flex;
	height: 25px;
	width: 25px;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	outline: none;
}

</style>