<script setup lang="ts">
const { t } = useI18n();
const mobile = inject('mobile');

getMeta({
	title: t('meta.about_us.title'),
	description: t('meta.about_us.description')
});
</script>

<template>
	<div class="root">
		<HeaderCommon />
		<div class="cooperation">
			<div class="cooperation__cooperate">Сотрудничество с нами</div>
			<div class="cooperation__placeholder">Placeholder</div>
			<div class="wrapper">
				<div class="cooperation__products">Наши услуги</div>
				<div class="cooperation__products__option">
                    <div class="product product__kit product--line">
                        <div class="product__header">Базовый пакет Бесплатный</div>
                        <div class="product__picture">Картинка</div>
                    </div>
                    <div class="product product__options product--line">
                        <ul class="product__options__list">
                            <li class="product__options__list--item">Размещение анонса мероприятия на сайте</li>
                            <li class="product__options__list--item">Отображение в общем списке событий</li>
                            <li class="product__options__list--item">Возможность получения отзывов и оценок от пользователей</li>
                        </ul>            
                    </div>
                    <div class="product product__button">
                        <div>Price</div>
                        <div>Button</div>
                    </div>
                </div>
				<div class="cooperation__products__option">Табличка с li</div>
				<div class="cooperation__products__option">Табличка с li</div>
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
.product{
    display: flex;
    flex-direction: column;    
    align-items: center;
    justify-content: center;
    &__header{
        font-size:  clamp(16px, 1.5vw, 20px);
        font-weight: 500;
    }
    &__picture{
        height: 200px;
        width: 200px;
    }
    &__kit{
        width: 32%;
    }
    &__options{
        padding-left: 1.5vw;
        padding-right: 1.5vw;
        width: 45%;
        &__list{
            margin-left: 2vw;
            &--item{
                list-style-type: disc;
                margin-bottom: 10px;
            }
        }
    }
    &__button{
        width: 23%;
    }
    &--line{
        border-right: 2px solid var(--color-input-field);
    }
    
}
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
	&__products__option {
		height: 100%;
		width: 100%;
		border: 2px solid var(--color-accent-green-main);
		border-radius: 8px;
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        padding-bottom: 20px;
	}
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 60px;
	}
}
</style>
