import { defineStore } from 'pinia'
import { maxRequests } from '@/constants/global'

type listStore = { needScrollList: boolean, eventRequestLimit: number }

export const useListStore = defineStore('eventList', {
  state: (): listStore => ({ needScrollList: false, eventRequestLimit: maxRequests }),
})