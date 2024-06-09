<script setup lang="ts">
  
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

    
}

    
</style>