<script setup lang="ts">
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import type { TagList } from '../../../common/const/tags';

const route = useRoute();
const mobile = inject('mobile');

const filterStore = useFilterStore();

defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		default: () => []
	}
});
//dayjs.utc(queryDate)
const belg = 'belgrade';
const nov = 'novisad';
const podg = 'podgoritsa';

const dates = ref([
	dayjs(getFirstQuery(route.query.startDate)) ?? undefined,
	dayjs(getFirstQuery(route.query.endDate)) ?? undefined
]);
const tags = ref(
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '') ?? []
);

watch(
	() => tags,
	async (val) => {
		await navigateTo({
			query: {
				...route.query,
				tags: val.value.join(', ') || undefined
			}
		});
	},

	{ deep: true }
);

watch(
	() => dates,
	async (val) => {
		alert(JSON.stringify(val.value[1]));
		await navigateTo({
			query: {
				...route.query,

				startDate: val.value[0] ? dayjs(val.value[0]).format('YYYY-MM-DD') : undefined,
				endDate: val.value[1] ? dayjs(val.value[1]).format('YYYY-MM-DD') : undefined
			}
		});
	},

	{ deep: true }
);

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
	<CommonNavLink :to="`/city/${belg}`">Belgrade</CommonNavLink>
	<CommonNavLink :to="`/city/${nov}`">Novi Sad</CommonNavLink>
	<CommonNavLink :to="`/city/${podg}`">Podgoritsa</CommonNavLink>

	<LibraryPopover>
		<template #trigger>
			<div class="trigger-popover2">
				<span>I am trigger</span>
				<CommonIcon
					name="container"
					color="var(--color-input-icons)"
				/>
			</div>
		</template>
		<template #content>
			<div class="content-popover2">
				<LibraryScrollArea>
					<ul style="height: 100%">
						<li
							v-for="country in countryList"
							:key="country"
						>
							<CommonNavLink :to="`/city/${country}`">{{ country }}</CommonNavLink>
						</li>
					</ul>
				</LibraryScrollArea>
			</div>
		</template>
	</LibraryPopover>

	<LazyCommonUiDateTimepicker
		v-model="dates"
		type="date"
		:range="true"
		is-filter
		appearance="no-border"
		class="filter"
		name="date"
		:placeholder="$t(`home.filter.date.placeholder`)"
		:aria-label="$t(`home.filter.date.aria`)"
		:min-date="new Date(roundTime(Date.now(), 10))"
	/>

	<HomeCollapsible>
		<template #tags>
			<div>
				<div class="filter-tags">
					<CommonUiTag
						v-for="tagElem in tagList"
						:key="tagElem"
						v-model="tags"
						name="tags"
						:tag-key="tagElem"
						is-checkbox
						:size="mobile ? 'small' : 'standard'"
						appearance="filter"
						:aria-label="$t(`home.filter.tags.aria`)"
					/>
				</div>
			</div>
		</template>
	</HomeCollapsible>
</template>
<style lang="less" scoped>
.trigger-popover {
	width: 100%;
	min-width: 100%;
	display: flex;
	justify-content: space-between;
	height: 40px;
	border: 1px solid #dbdbdb;
	border-radius: 8px;
	background-color: #ffffff;
	font-family: var(--font-family-main);
	font-size: var(--font-size-M);
	color: var(--color-text-main);
	padding: 8px 45px 8px 12px;
}
.content-popover2 {
	height: 200px;
	background-color: aquamarine;
	overflow: hidden;
}
</style>
