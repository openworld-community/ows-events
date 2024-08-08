<script setup lang="ts">
const route = useRoute();
import { useFilterStore } from '../../stores/filter.store';
import { API_URL } from '~/constants/url';

const filterStore = useFilterStore();
const key = '3b0f745872084e60b3d100135241707';
const baseUrl = 'http://api.weatherapi.com/v1';
const current = '/forecast.json';

const searchUrl = 'events/find';

onBeforeMount(async () => {
	//TODO костыль, иначе при ините страницы не достается value из запроса
	//if (process.server) return;
	//setTimeout(async () => {
	//	await filterStore.getUsedFilters();
	//});
	//	const { data: usedCities } = await apiRouter.filters.getUsedCities.useQuery({});
});

const { data: usedCities } = await apiRouter.filters.getUsedCities.useQuery({});

const { data: usedTags } = await apiRouter.filters.getUsedTags.useQuery({});

const capitalize = (str: string) => {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const getDataeFromQuery = (date?: string) => {
	const newDate = new Date(date).setHours(0, 0, 0);
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const dateTS = newDate ? newDate - timezoneOffset : null;
	return dateTS;
};

const param1 = ref('value1');
const city = computed(() => route.params.city);

const dt = ref(route.query.startDate);
const dateStart = computed(() => getDataeFromQuery(route.query.startDate as string));
const dateEnd = computed(() => getDataeFromQuery(route.query.endDate as string));
const tags = computed(() =>
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '')
);
const getDataFromParams = (data: ReturnType<typeof useRoute>['params'][string]) => {
	const newCity = getFirstParam(data);
	//city.value = capitalize(newCity);
};
console.log('ROUTE_PATH', route.path);

watch(
	() => route.params.city,
	(val) => {
		getDataFromParams(val);
	},
	{ deep: true }
);

//watch(
//	() => route.query,
//	(val) => {
//alert(JSON.stringify(val));
//	dt.value = val.startDate;
//tags.value = getFirstQuery(val.tags)
//	.split(', ')
//	.filter((item) => item !== '');
//	},
////	{ deep: true }
//);

const { data, status, error, refresh, pending } = await useFetch(`${baseUrl}${current}`, {
	query: { q: city, key: key, dt, tags }
});
// backend noy suited for this - becouse it is query not body
//"req":{"method":"POST","url":"/api/events/find?tags=restaurant&startDate=1721520000000&endDate=1721520000000","hostname":"127.0.0.1","remoteAddress":"172.18.0.4","remotePort":58494}
const {
	data: events,
	pending: pendingEvents,
	error: errorEvents
} = await useFetch(`${API_URL}/${searchUrl}/${route.params.city}`, {
	query: { tags, startDate: dateStart, endDate: dateEnd }
});
const { data: posterEvents } = await apiRouter.filters.findEvents2.useQuery({
	data: {
		query: {
			tags,
			startDate: dateStart,
			endDate: dateEnd
		},
		watch: [tags.value, dateStart.value, dateEnd.value]
	}
});

const {
	data: eventsB,
	pending: pendingEventsB,
	error: errorEventsB
} = await useFetch(`${API_URL}/${searchUrl}`, {
	body: {
		tags,
		startDate: dateStart,
		endDate: dateEnd,

		watch: [tags.value, dateStart.value, dateEnd.value]
	},
	method: 'POST'
});

const countryList = [
	'Afghanistan',
	'Albania',
	'Algeria',
	'American Samoa',
	'Andorra',
	'Angola',
	'Anguilla',
	'Antarctica',
	'Antigua and Barbuda',
	'Argentina',
	'Armenia',
	'Aruba',
	'Australia',
	'Austria',
	'Azerbaijan',
	'Bahamas (the)',
	'Bahrain',
	'Bangladesh',
	'Barbados',
	'Belarus',
	'Belgium',
	'Belize',
	'Benin',
	'Bermuda',
	'Bhutan',
	'Bolivia (Plurinational State of)',
	'Bonaire, Sint Eustatius and Saba',
	'Bosnia and Herzegovina',
	'Botswana',
	'Bouvet Island',
	'Brazil',
	'British Indian Ocean Territory (the)',
	'Brunei Darussalam',
	'Bulgaria',
	'Burkina Faso',
	'Burundi',
	'Cabo Verde',
	'Cambodia',
	'Cameroon',
	'Canada',
	'Cayman Islands (the)',
	'Central African Republic (the)',
	'Chad',
	'Chile',
	'China',
	'Christmas Island',
	'Cocos (Keeling) Islands (the)',
	'Colombia',
	'Comoros (the)',
	'Congo (the Democratic Republic of the)',
	'Congo (the)',
	'Cook Islands (the)',
	'Costa Rica',
	'Croatia',
	'Cuba',
	'Curaçao',
	'Cyprus',
	'Czechia',
	"Côte d'Ivoire",
	'Denmark',
	'Djibouti',
	'Dominica',
	'Dominican Republic (the)',
	'Ecuador',
	'Egypt',
	'El Salvador',
	'Equatorial Guinea',
	'Eritrea',
	'Estonia',
	'Eswatini',
	'Ethiopia',
	'Falkland Islands (the) [Malvinas]',
	'Faroe Islands (the)',
	'Fiji',
	'Finland',
	'France',
	'French Guiana',
	'French Polynesia',
	'French Southern Territories (the)',
	'Gabon',
	'Gambia (the)',
	'Georgia',
	'Germany',
	'Ghana',
	'Gibraltar',
	'Greece',
	'Greenland',
	'Grenada',
	'Guadeloupe',
	'Guam',
	'Guatemala',
	'Guernsey',
	'Guinea',
	'Guinea-Bissau',
	'Guyana',
	'Haiti',
	'Heard Island and McDonald Islands',
	'Holy See (the)',
	'Honduras',
	'Hong Kong',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iran (Islamic Republic of)',
	'Iraq',
	'Ireland',
	'Isle of Man',
	'Israel',
	'Italy',
	'Jamaica',
	'Japan',
	'Jersey',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'Kiribati',
	"Korea (the Democratic People's Republic of)",
	'Korea (the Republic of)',
	'Kuwait',
	'Kyrgyzstan',
	"Lao People's Democratic Republic (the)",
	'Latvia',
	'Lebanon',
	'Lesotho',
	'Liberia',
	'Libya',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Macao',
	'Madagascar',
	'Malawi',
	'Malaysia',
	'Maldives',
	'Mali',
	'Malta',
	'Marshall Islands (the)',
	'Martinique',
	'Mauritania',
	'Mauritius',
	'Mayotte',
	'Mexico',
	'Micronesia (Federated States of)',
	'Moldova (the Republic of)',
	'Monaco',
	'Mongolia',
	'Montenegro',
	'Montserrat',
	'Morocco',
	'Mozambique',
	'Myanmar',
	'Namibia',
	'Nauru',
	'Nepal',
	'Netherlands (the)',
	'New Caledonia',
	'New Zealand',
	'Nicaragua',
	'Niger (the)',
	'Nigeria',
	'Niue',
	'Norfolk Island',
	'Northern Mariana Islands (the)',
	'Norway',
	'Oman',
	'Pakistan',
	'Palau',
	'Palestine, State of',
	'Panama',
	'Papua New Guinea',
	'Paraguay',
	'Peru',
	'Philippines (the)',
	'Pitcairn',
	'Poland',
	'Portugal',
	'Puerto Rico',
	'Qatar',
	'Republic of North Macedonia',
	'Romania',
	'Russian Federation (the)',
	'Rwanda',
	'Réunion',
	'Saint Barthélemy',
	'Saint Helena, Ascension and Tristan da Cunha',
	'Saint Kitts and Nevis',
	'Saint Lucia',
	'Saint Martin (French part)',
	'Saint Pierre and Miquelon',
	'Saint Vincent and the Grenadines',
	'Samoa',
	'San Marino',
	'Sao Tome and Principe',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Seychelles',
	'Sierra Leone',
	'Singapore',
	'Sint Maarten (Dutch part)',
	'Slovakia',
	'Slovenia',
	'Solomon Islands',
	'Somalia',
	'South Africa',
	'South Georgia and the South Sandwich Islands',
	'South Sudan',
	'Spain',
	'Sri Lanka',
	'Sudan (the)',
	'Suriname',
	'Svalbard and Jan Mayen',
	'Sweden',
	'Switzerland',
	'Syrian Arab Republic',
	'Taiwan',
	'Tajikistan',
	'Tanzania, United Republic of',
	'Thailand',
	'Timor-Leste',
	'Togo',
	'Tokelau',
	'Tonga',
	'Trinidad and Tobago',
	'Tunisia',
	'Turkey',
	'Turkmenistan',
	'Turks and Caicos Islands (the)',
	'Tuvalu',
	'Uganda',
	'Ukraine',
	'United Arab Emirates (the)',
	'United Kingdom of Great Britain and Northern Ireland (the)',
	'United States Minor Outlying Islands (the)',
	'United States of America (the)',
	'Uruguay',
	'Uzbekistan',
	'Vanuatu',
	'Venezuela (Bolivarian Republic of)',
	'Viet Nam',
	'Virgin Islands (British)',
	'Virgin Islands (U.S.)',
	'Wallis and Futuna',
	'Western Sahara',
	'Yemen',
	'Zambia',
	'Zimbabwe',
	'Åland Islands'
];
</script>
<template>
	<main>
		<LibraryAutocomplete
			:options="countryList"
			placeholder="lpopop"
		/>
		<CityHerowrap :title="`I am the city ${city}`">
			<div>filters</div>
			<CityFilters :tag-list="usedTags" />
		</CityHerowrap>

		<div>ref:</div>
		<div>{{ city }}</div>
		<div>data:</div>
		<div v-if="pending">Loading...</div>
		<pre v-else>{{ data }}</pre>

		<div>error:</div>
		<pre>{{ error }}</pre>
		<div>events:</div>
		<div v-if="pendingEvents">Loading events....</div>
		<pre v-else>{{ posterEvents }}</pre>
		<div>error:</div>
		<pre>{{ errorEvents }}</pre>
		<div>EventsB:</div>
		<pre>{{ eventsB }}</pre>
		<div>errorB:</div>
		<pre>{{ errorEventsB }}</pre>
	</main>
</template>
