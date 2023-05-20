import { api } from '@/plugins/axios'
import { type EventOnPoster } from '@common/types/event'

export const getEvents = async (): Promise<EventOnPoster[]> => {
  const { data } = await api.get('/events')
  return data
}

export const getEventsByParams = async ({
  searchLine,
  country,
  city
}: {
  searchLine?: string
  country?: string
  city?: string
}): Promise<EventOnPoster[]> => {
  const { data } = await api.post('/events/find', { searchLine, country, city })
  return data
}
