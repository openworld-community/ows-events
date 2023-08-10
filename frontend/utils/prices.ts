import type { EventPrice } from '../../common/types/event';

// Получает аббривеатуру валюты (если существует)
export const formatCurrency = (currency: string) => {
	const formatter = new Intl.NumberFormat('ru', {
		style: 'currency',
		currency: currency,
		currencyDisplay: 'narrowSymbol',
		minimumFractionDigits: 0
	});
	// эта стандартная функция работает только если передать в нее число (цену), а нам нужен только значок валюты
	// поэтому передаем в функцию просто единицу, и далее обрезаем ее
	return formatter.format(1).slice(1);
};

// Форматирует значение цены в зависимости от значения или интервала:
export const formatPrice = (price: EventPrice) => {
	const { t } = useI18n();
	// если фиксированная цена, возвращает price currency:
	if (price?.value && price?.currency) return `${price.value} ${formatCurrency(price.currency)}`;
	// если интервал, возвращает min-max currency:
	if (price?.minValue && price?.maxValue && price?.currency)
		return `${price.minValue}-${price.maxValue} ${formatCurrency(price.currency)}`;
	// если интервал от, возвращает "От price currency"
	if (price?.minValue && price?.currency)
		return `${t('event.price.from')} ${price.minValue} ${formatCurrency(price.currency)}`;
	// если интервал до, возвращает "До price currency"
	if (price?.maxValue && price?.currency)
		return `${t('event.price.to')} ${price.maxValue} ${formatCurrency(price.currency)}`;
};

//TODO: выбирает валюту в зависимости от страны (пока валюты прибиты на фронте)
export const getCurrencyByCountry = (country: string) => {
	if (country === 'Montenegro') return 'EUR';
	if (country === 'Serbia') return 'RSD';
	if (country === 'Kyrgyzstan') return 'KGS';
	return 'USD';
};
