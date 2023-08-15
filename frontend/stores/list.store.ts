import { defineStore } from 'pinia'
import { maxRequests } from '@/constants/global'
import type { EventOnPoster } from '../../common/types'

type lastAction = 'NONE' | 'INDEX' | 'HEADER'

type listStore = { 
  needScrollList: boolean,
  eventRequestLimit: number,
  hasMorePages: boolean,
  events: EventOnPoster[] | null,
  scrollTop: number,
  lastAction: lastAction
}

export const useListStore = defineStore('eventList', {
  state: (): listStore => ({ 
    needScrollList: false,
    eventRequestLimit: maxRequests,
    hasMorePages: true,
    events: [],
    scrollTop: 0,
    lastAction: 'NONE'
  }),
  actions: {
    incrementRequestLimit(maxRequests: number) {
      this.eventRequestLimit += maxRequests
    }
  }
})