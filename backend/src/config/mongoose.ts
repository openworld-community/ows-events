import mongoose from 'mongoose';
import { vars } from './vars';

const { env } = vars;

mongoose.Promise = Promise;

if (env === 'develop') {
	mongoose.set('debug', true);
}
