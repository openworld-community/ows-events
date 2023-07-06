import { ServerErrors } from './errors';
import { header } from './header';
import { about } from './about';
import { meta } from './meta';
import { global } from './global';
import { home } from './home';
import { event } from './event';
import { component } from './component';
import { dates } from './dates';
import { limitation_of_liability } from './limitation-of-liability';

const ruTranslation = {
	error: ServerErrors,
	header,
	about,
	meta,
	limitation_of_liability,
	global,
	home,
	event,
	component,
	dates
};

export default ruTranslation;
