<template>
    <div>
        <div class="page-error">
            <div class="page-not-found-error">
                <div class="not-found-style">
                    <div class="stylesss">{{ $t('errors.ERROR_PAGE_PAGE', ) }}</div>
                    <div class="stylesss">{{ $t('errors.ERROR_PAGE_NOT_FOUND', ) }}</div>
                </div>            
            </div>
        
            <div class="image-error"></div>

            
        </div>
        <div class="stylesss stylesss--padding">{{ $t('errors.ERROR_PAGE_ERROR', ) }}</div>
    </div>    
</template>
<style scoped lang="less">
.stylesss {
    /* Font Family импортируется в nuxt.config.ts в самом низу ориентир rel:stylesheet */
    font-family: var(--font-family-error);
    font-size:30px;
    @media (max-width: 768px) {
		font-size: 20px;
        font-weight: 600;
	}	
    &--padding{
        display: block;
        text-align: center;
        padding-top:10px;
    }
}
.page-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
	width: 550px;
	height: 410px;
    @media (max-width: 768px) {
		width: 340px;
        height: 250px;
	}	
}
.image-error {
    width: 550px;
	height: 410px;
    background-image: url(@/assets/img/error/404.webp); 
    background-size: contain; /* изображение будет масштабироваться, чтобы покрыть всю область фона блока */
    background-repeat: no-repeat;
    @media (max-width: 768px) {
		width: 340px;
        height: 250px;
	}	
}
.page-not-found-error{
    position:fixed;
    margin-bottom: 205px;
    @media (max-width: 768px) {
		margin-bottom: 130px;
	}	
    
}
.not-found-style{
    width: 550px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    @media (max-width: 768px) {
		width: 340px;
	} 
}


</style>