<script setup lang="ts">
import cooperation from "~/i18n/locales/en-GB/cooperation";
import Package from "../components/common/cooperation/Package.vue"
const { t } = useI18n();
const mobile = inject('mobile');

</script>

<template>
	<div class="root">
		<HeaderCommon />
		<div class="cooperation">
			<div class="cooperation__cooperate">Сотрудничество с нами</div>
			<div class="cooperation__placeholder">Placeholder</div>
			<div class="wrapper">
				<div class="cooperation__packages">Наши услуги</div>
				<Package
                :name="$t('cooperation.package.basic.name')"
                :option="$t('cooperation.package.basic.option')"
                :price="$t('cooperation.package.basic.price')"
                />
				<div class="package">Табличка с li</div>
				<div class="package">Табличка с li</div>
			</div>
		</div>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style lang="less" scoped>
// li::before {
//     // такой синтаксис был выбран по причине того что если мы добавляем к ul оно не сработает
//     // т.к выше list-style: none, а поменяв выше логику можно что то сломать.
//     content: "•"; /* Устанавливаем содержимое псевдоэлемента как точку */
//     margin-right: 5px; /* Добавляем отступ между маркером и текстом */
// }
.cooperation {
	height: 100%;
	width: 100vw;
	padding-left: 5vw;
	padding-right: 5vw;
	padding-top: 50px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	@media (max-width: 768px) {
		padding-left: 1.5vw;
		padding-right: 1.5vw;
	}
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 60px;
	}
}
</style>
