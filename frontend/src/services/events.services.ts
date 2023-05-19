import {api} from "@/plugins/axios";
import {type EventOnPoster} from '@common/types/event'

export const getEvents = async ():Promise<EventOnPoster[]> => {
    const {data} = await api.get('/events')
    return data
}

export const postEvent = async (data:any) => {
    await api.post('/events/add', data)
}