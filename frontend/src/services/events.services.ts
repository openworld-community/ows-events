import {api} from "@/plugins/axios";
import { type EventOnPoster } from '@common/types/event'

export const getEvents = async ():Promise<EventOnPoster[]> => {
    const {data} = await api.get('/events')
    return data
}