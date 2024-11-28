import { RoutePathEnum } from './constants/enums/route';

// https://nuxt.com/modules/robots
export default [
	{ UserAgent: '*' },
	{
		Disallow: [
			RoutePathEnum.HOME, //тест
			// RoutePathEnum.USER_PAGE, //прод
			// RoutePathEnum.USER_FAVOURITES, //прод
			// RoutePathEnum.USER_MY_EVENTS, //прод
			// RoutePathEnum.EVENT_EDIT, //прод
			// RoutePathEnum.LIMITATION_OF_LIABILITY //прод
			//		RoutePathEnum.EVENT_FORM, //было закомментировано
		]
	}
];
