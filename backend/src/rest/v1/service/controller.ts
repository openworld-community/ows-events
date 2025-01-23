import { ICitySitemapData, ICountrySitemapData, IEventSitemapData } from '@common/types/service';
import {
	IGetCitiesSitemapDataHandler,
	IGetCountriesSitemapDataHandler,
	IGetEventsSitemapDataHandler
} from './type';
import { seoController } from '../../../controllers/SEO-controller';

export const getEventsSitemapData: IGetEventsSitemapDataHandler = async (): Promise<
	IEventSitemapData[]
> => seoController.getSitemapEventsData();

export const getCountriesSitemapData: IGetCountriesSitemapDataHandler = async (): Promise<
	ICountrySitemapData[]
> => seoController.getUsedCountriesSitemapData();

export const getCitiesSitemapData: IGetCitiesSitemapDataHandler = async (): Promise<
	ICitySitemapData[]
> => seoController.getUsedCitiesSitemapData();
