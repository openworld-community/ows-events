<template>
    <div style="display: flex; flex-direction: column; gap: 100px;">
        <CommonUiDateTimepicker
            v-model="date1"
            type="date"
            name="test"
            :range="true"
        />
        {{ date2 }}
        <VueDatePicker
            v-model="date2"
            range
            :min-date="new Date()"
            :start-date="new Date()"
        />
        <VueDatePicker
            ref="datepicker"
            v-model="date3"
            range
            :input-class-name="`input input__field`"
            mode-height="80"
            :auto-apply="true"
            :keep-action-row="true"
            :close-on-auto-apply="true"
            partial-flow
            :flow="['calendar']"
            :time-picker="false"
            :month-change-on-arrows="true"
            :enable-time-picker="false"
            :clearable="false"
        />
        <CommonUiFilter
            filter-type="date"
            name="test"
            :range="true"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';

const date1 = ref()
const date2 = ref()
const date3 = ref()

const emit = defineEmits(['update:model-value']);
const datepicker = ref<DatePickerInstance>(null);

const dateFormat = (date: Date) => {
    return dayjs(date).format('DD.MM.YYYY');
};

const onRemove = () => {
    emit('update:model-value', null);
};
</script>

<style
    lang="less"
    scoped
>
.dp {
    &__disabled {
        background-color: transparent;
    }

    &__action_row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
        gap: 10px;
    }

    &__menu {
        // left: unset !important;
        // transform: unset !important;
        overflow: hidden;

        &_inner {
            padding: 16px 17px;
        }

        &.time_picker {
            right: 0 !important;
        }
    }

    &__main {
        position: relative;
    }

    &__menu_transitioned,
    &__input {
        border-radius: 8px;
    }

    &__input {
        padding: 8px 12px;
        font-family: var(--font-family-main);
        color: var(--color-text-main);
        border: 1px solid var(--color-input-field);
        font-size: var(--font-size-M);

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &.no-border {
            border-color: var(--color-white)
        }

        &:hover {
            border-color: var(--color-input-field);
        }

        &.filter:hover {
            border-color: transparent;
        }

        &:active,
        &:focus-visible {
            outline: none;
            border: 1px solid #48c78e;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        &:disabled {
            opacity: 0.4;
        }

        &::placeholder {
            font-family: var(--font-family-main);
            font-size: var(--font-size-M);
            color: var(--color-input-icons);
        }

        &_icon {
            display: none;
        }
    }

    &__instance_calendar {
        overflow: hidden;
        font-family: var(--font-family-main);
    }

    &__calendar_item,
    &__instance_calendar {
        padding: 3px;
        color: var(--color-text-main);
        font-size: var(--font-size-XS);
    }

    &__calendar_header {
        &_separator {
            opacity: 0;
        }

        &_item {
            font-size: var(--font-size-XS);
            color: var(--color-text-secondary);
            font-weight: 500;
            text-transform: uppercase;
        }
    }

    &__month_year {
        &_wrap {
            justify-content: center;
        }

        &_select {
            &:hover {
                color: var(--color-accent-green-main);
            }
        }
    }

    &__btn {
        color: var(--color-accent-green-main);
        font-size: var(--font-size-M);
        margin: 0;

        &:hover {
            color: var(--color-accent-green-main);
        }
    }

    &__cell {
        &_inner {
            border-radius: 50%;
            background-color: var(--color-white);
            color: var(--color-text-main);
            font-size: var(--font-size-XS);
            font-weight: 500;
            height: 24px;
            width: 24px;
        }

        &_disabled {
            color: var(--color-input-field);
            cursor: default;
        }

        &_offset {
            color: var(--color-input-field);
        }
    }

    &__today {
        border-color: var(--color-accent-green-main);
    }

    &__overlay_cell_active,
    &__active_date {
        padding: 3px;
        background-color: var(--color-accent-green-main);
        color: var(--color-white);
    }

    &__time-display {
        &:hover {
            color: var(--color-text-main);
        }
    }

    &__arrow_bottom,
    &__arrow_top {
        opacity: 0;
    }
}

.dp__inner_nav svg {
    color: var(--color-accent-green-main);
}

.dp__inc_dec_button_disabled,
.dp__inner_nav_disabled,
.dp__overlay_cell_disabled {
    background: none;

    &:hover {
        background: none;
        cursor: default;
    }

    &:active,
    &:focus {
        background: none;
        cursor: unset;
    }

    svg {
        color: var(--color-input-field);
    }
}

.dp__btn:focus {
    background: transparent;
}
</style>