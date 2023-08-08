<script setup lang="ts">
import {
	SeoItempropOrganizationEnum,
	SeoItempropURLEnum,
	SeoItemTypeEnum
} from '../constants/enums/seo';
</script>

<template>
	<div class="privacy">
		<h1 class="privacy__main-title">{{ $t('limitation_of_liability.title') }}</h1>
		<p class="privacy__paragraph">Дата последнего изменения: 25.06.2023.</p>

		<ol class="privacy__list"
				itemscope
				:itemtype="SeoItemTypeEnum.ORGANIZATION"
				:itemprop="SeoItempropOrganizationEnum.PUBLISHING_PRINCIPLES"
		>
			<li>
				Администрация сайта
				<NuxtLink
					to="https://afisha.peredelano.com"
					class="link"
					target="_blank"
					itemscope
					:itemtype="SeoItemTypeEnum.URL"
					:itemprop="SeoItempropURLEnum.FEEDBACK_POLITY"
				>
					afisha.peredelano.com
				</NuxtLink>
				и социальных сетей AfishaPeredelano (Далее — Афиша) не занимается самостоятельной
				организацией мероприятий, освещаемых на сайте
				<NuxtLink
					to="https://afisha.peredelano.com"
					class="link"
					target="_blank"
					itemscope
					:itemtype="SeoItemTypeEnum.URL"
					:itemprop="SeoItempropURLEnum.FEEDBACK_POLITY"
				>
					afisha.peredelano.com
				</NuxtLink>
				или в социальных сетях
				<span
						:itemprop="SeoItempropOrganizationEnum.BRAND"
				>
				AfishaPeredelano
				</span>
				(Далее — Сервис). Состоится мероприятие или
				нет, зависит от третьих лиц, за действия которых Афиша не отвечает и не может
				оказывать на них влияние. В связи с этим Афиша не гарантирует достоверность
				сведений, размещенных на Сервисе.
			</li>
			<li>
				Афиша не гарантирует корректную работу сайтов, ссылки на которые размещены на
				Сервисе. Также Афиша не гарантирует соответствие сторонних сайтов требованиям
				законодательства. Афиша не гарантирует конфиденциальность данных пользователя на
				сторонних сайтах.
			</li>
			<li>
				Афиша не несет ответственности и не возмещает никакой ущерб, прямой или косвенный,
				причиненный пользователю сайта или любым третьим лицам в результате использования
				или невозможности использования Сервиса и размещенной на Сервисе информации.
			</li>
			<li>
				У пользователей сайта есть возможность размещать на сайте Афиши контент
				самостоятельно, без участия администрации. Афиша не обязуется модерировать контент
				размещаемых пользователями.
			</li>
			<li>
				Афиша не гарантирует достоверность информации, размещаемой пользователями на
				Сервисе. Афиша не гарантирует, что мероприятия, информация о которых размещается
				пользователями, состоятся, а сайты, ссылки на которые размещают пользователи,
				исправно работают, отвечают требованиям закона и обеспечивают конфиденциальность
				данных пользователей.
			</li>
			<li>
				Пользователи, размещающие контент на Сервисе самостоятельно отвечают перед третьими
				лицами и государственными органами за свои действия. Пользователь, используя Сервис
				обязуется не нарушать ничьи авторские права, права на товарные знаки, средства
				индивидуализации и/или права на иные объекты интеллектуальной собственности.
				Пользователь обязуется самостоятельно и за свой счет урегулировать конфликты с
				третьими лицами, связанные с действиями пользователя на Сервисе.
			</li>
			<li>
				Пользователь и третьи лица обязуются урегулировать конфликты с Афишей во внесудебном
				порядке путём направления претензий по любым доступным каналам связи. В случае
				невозможности урегулировать конфликт в претензионном порядке, он подлежит
				урегулировании в соответствии с применимым законодательством
			</li>
			<li>
				Отсутствие гарантий означает, что Афиша не принимает на себя никаких обязательств и
				не несёт ответственность перед пользователями Сервиса или третьими лицами в связи с
				контентом, размещаемом на Сервисе.
			</li>
		</ol>
	</div>
</template>

<style scoped lang="less">
.privacy {
	padding: 34px var(--padding-side);

	&__main-title {
		font-size: var(--font-size-XXL);
		line-height: 40px;
		font-weight: var(--font-weight-bold);
		margin-bottom: 15px;
	}

	&__title {
		font-size: var(--font-size-L);
		padding-top: 10px;
		margin-bottom: 15px;
	}

	&__paragraph,
	&__list > li {
		font-size: var(--font-size-S);
		line-height: 20px;
		margin-bottom: 15px;
	}

	&__list > li {
		margin-left: 1rem;
		list-style-type: decimal;
		list-style-position: outside;

		.link {
			text-decoration: underline;
			font-weight: 500;
		}
	}
}
</style>
