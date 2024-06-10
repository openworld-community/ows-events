<script setup lang="ts">

    import { SeoItempropAboutEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
    

    import {
        REPO_URL,
        SocialLinks,
        VITE_DOMAIN
	    
    } from '~/constants/url';   
  
</script>

<template>
    <main class="about">
        <div class="about__info">
            <div class="about__wrapper">
                <img
                    class="about__wrapper__image"
                    src="@/assets/img/about/about-info.png"   
		        />
                <p class="about__wrapper__text-img">{{ $t('about.title') }}</p>
            </div>
            <p class="about__text">{{ $t('about.idea') }}</p>
        </div>

        <h3 class="about__values_header"> {{ $t('about.values.title') }}</h3>

        <AboutValues /> 
      
        <div class="about__navigation">

            <p class="about__paragraph">
				<p>{{ $t('about.github') }} </p> 
				<CommonNavLink
					:href="REPO_URL"
					class="about__link"
					is-external-link
					rel="noopener noreferrer"
					:itemprop="SeoItempropAboutEnum.SIGNIFICANT_LINK"
				>
					Repo
				</CommonNavLink>
			</p>

            <p class="about__paragraph">
			   <p>{{ $t('about.website') }}</p> 
				<CommonNavLink
					:href="VITE_DOMAIN"
					class="about__link"
					
				>
                    https://afisha.peredelano.com/ru
				</CommonNavLink>
			</p>

            <div class="about__social-links social-links">
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

        

    
    }

    &__wrapper {
            position: relative;

            
            
            
            &__text-img {
                
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 60px;

            

            }

        
    }

    &__text {
        line-height: 17px;
        font-size: var(--font-size-S);
        margin-bottom: 30px;

        
    }

    &__values_header {
        text-align: center;
        font-size: var(--font-size-M);
        font-weight: 600px;
        line-height: 25px;
        margin-bottom: 30px;
    
    }
// Навигация

    &__navigation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin-top: 30px;
    }
    &__paragraph{
        display: flex;
        font-size: var(--font-size-S);
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
		font-size: var(--font-size-L);
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