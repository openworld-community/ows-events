import {api} from "@/plugins/axios";
import {type EventOnPoster, type NewEventOnPoster} from '@common/types/event'

export const getEvents = async ():Promise<EventOnPoster[]> => {
    const {data} = await api.get('/events')
    return data
}

export const postEvent = async (data:NewEventOnPoster) => {
    await api.post('/events/add', data)
}