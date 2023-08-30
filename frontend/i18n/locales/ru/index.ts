import { ServerErrors } from './errors';
import { header } from './header';
import { about } from './about';
import { meta } from './meta';
import { global } from './global';
import { home } from './home';
import { event } from './event';
import { modal } from './modal';
import { dates } from './dates';
import { limitation_of_liability } from './limitation-of-liability';
import {donate} from "./donate";
import {user} from './user';

const ruTranslation = {
	meta,
	global,
	header,
	home,
	event,
	about,
	donate,
	user,
	limitation_of_liability,
	modal,
	dates,
	error: ServerErrors,
};

export default ruTranslation;
