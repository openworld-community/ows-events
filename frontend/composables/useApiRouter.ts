import { auth } from './useApiRouter/auth';
import { events } from './useApiRouter/events';
import { location } from './useApiRouter/location';
import { payment } from './useApiRouter/payment';
import { timezone } from './useApiRouter/timezone';
import {user} from './useApiRouter/user'
import { defineRouter } from './useApiRouter/utils';

export const apiRouter = defineRouter({
	events,
	auth,
	location,
	payment,
	timezone,
	user
});
