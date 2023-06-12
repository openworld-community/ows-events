<script setup lang="ts">
type Props = {
    closeDeleteEventModal: () => void;
    removeEvent: () => void;
};

const props = defineProps<Props>();
</script>

<template>
    <CommonModalWrapper 
        :hide-overlay="false" 
        overlay-transition="vfm-fade" 
        overlay-transition-duration="2600"
        content-transition="vfm-fade" 
        :click-to-close="true" 
        :esc-to-close="true" 
        :lock-scroll="false"
    >
        <div class="modal">
            <div class="modal-card__head">
                <p class="modal-card__title">
                    {{ $translate('component.delete_event_modal.title') }}
                </p>
            </div>
            <div class="modal-card__foot">
                <CommonButton 
                button-kind="ordinary" 
                :button-text="$translate('component.delete_event_modal.button.cancel')"
                    @click="props.closeDeleteEventModal" 
                    />
                <CommonButton 
                button-kind="success" 
                :button-text="$translate('component.delete_event_modal.button.submit')"
                    @click="props.removeEvent" 
                    />
            </div>
        </div>
    </CommonModalWrapper>
</template>

<style scoped lang="less">
.modal {
    //TODO: пока верстка только мобилки
    max-width: 350px;
    overflow: hidden;
    border-radius: 10px;
    margin: 40vh auto auto;
}

.modal-card {
    &__head {
        height: max-content;
        justify-content: center;
    }

    &__foot {
        padding: 12px 57px;
        justify-content: space-between;
    }
}
</style>