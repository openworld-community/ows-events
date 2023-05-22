import { api } from '@/plugins/axios'
import { type EventOnPoster } from '@common/types'

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
export const getEvent = async (id: string): Promise<EventOnPoster> => {
  const { data } = await api.get(`/events/${id}`)
  return data
}

export const postEventImage = async (img: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', img)
  const { data } = await api.post('/image/add', formData)
  return data.data.path
}

export const deleteEventImage = async (path: string) => {
  await api.post('/image/delete', { path: path })
}

export const postEvent = async (data: any) => {
  await api.post('/events/add', data)
}

export const editEvent = async (data: any) => {
  await api.post('/events/update', data)
}

export const deleteEvent = async (id: string) => {
  await api.post('/events/delete', { id })
}
