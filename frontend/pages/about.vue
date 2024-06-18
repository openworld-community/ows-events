<script setup lang="ts">

import {    
    SeoItempropAboutEnum, 
    SeoItemTypeEnum 
} from '~/constants/enums/seo';

import {
    REPO_URL,
    SocialLinks,
    
} from '~/constants/url'; 
import { RoutePathEnum } from '../constants/enums/route';

const { t } = useI18n();
getMeta({
	title: t('meta.about_us.title'),
	description: t('meta.about_us.description')
})


</script>

<template>
    <main 
        class="about"
        itemscope
		:itemtype="SeoItemTypeEnum.ABOUT"
    >
        <div 
            class="about__info"
            :itemprop="SeoItempropAboutEnum.MAIN_CONTENT"
        
        >
            <div class="about-wrapper">
                <img
                    class="about-wrapper__image"
                    src="@/public/img/about/about-info.png"
                    :itemprop="SeoItempropAboutEnum.IMAGE"   
		        />
                <p class="about-wrapper__text-img">{{ $t('about.title') }}</p>
            </div>
            <p class="about__text">{{ $t('about.idea') }}</p>
        </div>

        <h3 class="about__values-header"> {{ $t('about.values.title') }}</h3>

        <AboutValues /> 
      
        <div class="about-navigation">

            <div class="about-navigation__paragraph">
				<p>{{ $t('about.github') }} </p> 
				<CommonNavLink
					:href="REPO_URL"
					class="about-navigation__link"
					is-external-link
					rel="noopener noreferrer"
					:itemprop="SeoItempropAboutEnum.SIGNIFICANT_LINK"
				>
					Repo
				</CommonNavLink>
			</div>

            <div class="about-navigation__paragraph">
			   <p>{{ $t('about.website') }}</p> 
				<CommonNavLink
					:to="RoutePathEnum.HOME"
					class="about-navigation__link"
                    :itemprop="SeoItempropAboutEnum.RELATED_LINK"
	
				>
                    https://afisha.peredelano.com
				</CommonNavLink>
			</div>

            <div class="about__social-links">
                <h3 class="social-links__title">
                    {{ $t('about.social.title') }}
                </h3>
                <ul class="social-links__list">
                    <li
                        v-for="(link, key) in SocialLinks"
                        :key="link"
                        class="social-links__item"
                    >
                        <CommonNavLink
                            :to="link"
                            is-external-link
                            class="social-links__link"
                            :style="`backgroundColor: var(--color-social-${key})`"
                            :title="$t(`about.social_title.${key}`)"
                            :aria-label="$t(`about.social_title.${key}`)"
                            :itemprop="SeoItempropAboutEnum.SOCIAL_LINK"
                        >
                            <CommonIcon
                                :name="`social/${key}-round`"
                                width="48px"
                                height="48px"
                            />
                        </CommonNavLink>
                    </li>
                </ul>
		    </div>
        </div>

    </main>
</template>

<style lang="less" scoped>
.about {
    width: 100%;
    padding: 20px;
    margin-top: 60px;

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media (min-width: 440px) {
			flex-direction: row;   
		}
    }

    &__text {
            line-height: 17px;
            font-size: var(--font-size-S);
            text-align: justify;
            
            @media (min-width: 365px) {
                    flex-basis: 73%;
                    padding-left: 15px;
            }

            @media (min-width: 1000px) {
                font-size: var(--font-size-ML);
                flex-basis: 60%;
                line-height: 24px;
            }
        }

    &__values-header {
        text-align: center;
        font-size: var(--font-size-M);
        font-weight: 600;
        line-height: 25px;
        margin: 30px;

        @media (min-width: 365px) {
		    font-size: var(--font-size-ML);          
		}

        @media (min-width: 768) {
            font-size: var(--font-size-XL);  
        }
    }
  
}

// Обертка для картинки с текстом внутри
.about-wrapper {
    position: relative;
    text-align: center;
    
    @media (min-width: 440px) {
        flex-basis: 27%; 
    }

    &__text-img {  
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 80px;

        @media (min-width: 440px) {
            font-size: 7vw;   
        }
    }   
}

// Навигация
.about-navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    font-size: var(--font-size-S);

    @media (min-width: 365px) {
        font-size: var(--font-size-M);
        margin-top: 90px
                
    }

    &__paragraph{
        display: flex;  
    }

    &__paragraph p{
        font-weight: 600;
        margin-right: 5px;    
    }

    &__link {
        color: var(--color-link);
        text-decoration: underline;
        font-weight: 600px;
    } 
} 

// Социальные сети
.social-links {
    &__title {
        line-height: 28px;	
    }

    &__list {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    &__item {
        display: flex;
        width: 48px;
        height: 48px;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }

    &__link {
        display: flex;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
}

</style>