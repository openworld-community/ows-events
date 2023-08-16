import { defineStore } from 'pinia'
import { pagesToLoad } from '@/constants/global'
import type { EventOnPoster } from '../../common/types'

type lastAction = 'NONE' | 'INDEX' | 'HEADER'

type listStore = { 
  needScrollList: boolean,
  eventRequestPages: number,
  events: EventOnPoster[] | null,
  scrollTop: number,
  lastAction: lastAction
}

export const useListStore = defineStore('eventList', {
  state: (): listStore => ({ 
    needScrollList: false,
    eventRequestPages: pagesToLoad,
    events: [],
    scrollTop: 0,
    lastAction: 'NONE'
  }),
  actions: {
    incrementRequestPages(pagesToLoad: number) {
      this.eventRequestPages += pagesToLoad
    }
  }
})