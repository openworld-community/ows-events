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


        <AboutValues />
        
        <div class="about__navigation">

        </div>

    </main>
</template>

<style lang="less" scoped>
.about {
    width: 100%;
    padding: 50px;
    
    
    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;

    
    }

    &__wrapper {
            position: relative;
            

            

            &__text-img {
                // Это для того чтобы расположить "О нас" посередине изображения
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 60px;

            }

        
        }

    
}

    
</style>