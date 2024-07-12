import type { Currency } from '~/stores/location.store';
import type { EventPrice } from '../../common/types/event';
import { NUMBER_DECIMALS_BY_CURRENCY } from '~/constants/defaultValues/validation';

// Получает аббривеатуру валюты (если существует)
export const formatCurrency = (currency: Currency) => {
	try {
		const formatter = new Intl.NumberFormat('ru', {
			style: 'currency',
			currency: currency,
			currencyDisplay: 'narrowSymbol',
			minimumFractionDigits: 0
		});
		// эта стандартная функция работает только если передать в нее число (цену), а нам нужен только значок валюты
		// поэтому передаем в функцию просто единицу, и далее обрезаем ее

		return formatter.format(1).slice(1);
	} catch {
		// при использовании кодов, не входящих в перечень ISO (USDT, USDC) выведется аббривеатура валюты
		return currency;
	}
};

// Форматирует значение цены в зависимости от значения или интервала:
export const formatPrice = (price: EventPrice) => {
	const { t } = useI18n();
	// если фиксированная цена, возвращает price currency:
	if (price?.value && price?.currency)
		return `${convertPriceToString(price.value, price.currency)} ${formatCurrency(
			price.currency
		)}`;
	// если интервал, возвращает min-max currency:
	if (price?.minValue && price?.maxValue && price?.currency)
		return `${convertPriceToString(price.minValue, price.currency)}-${convertPriceToString(
			price.maxValue,
			price.currency
		)} ${formatCurrency(price.currency)}`;
	// если интервал от, возвращает "От price currency"
	if (price?.minValue && price?.currency)
		return `${t('event.price.from')} ${convertPriceToString(
			price.minValue,
			price.currency
		)} ${formatCurrency(price.currency)}`;
	// если интервал до, возвращает "До price currency"
	if (price?.maxValue && price?.currency)
		return `${t('event.price.to')} ${convertPriceToString(
			price.maxValue,
			price.currency
		)} ${formatCurrency(price.currency)}`;
};

//TODO: выбирает валюту в зависимости от страны (пока валюты прибиты на фронте)
export const getCurrencyByCountry = (country: string) => {
	if (country === 'Montenegro') return 'EUR';
	if (country === 'Serbia') return 'RSD';

	return 'USD';
};

export const getLengthDecimalByCurrency = (currency: Currency) => {
	return NUMBER_DECIMALS_BY_CURRENCY[currency];
};

export const convertPriceToString = (price: number, currency: Currency) => {
	return price.toFixed(getLengthDecimalByCurrency(currency));
};
