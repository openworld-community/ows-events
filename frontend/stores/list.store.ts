import { defineStore } from 'pinia'

type listStore = { needScrollList: boolean, eventRequestLimit: number }

export const useListStore = defineStore('eventList', {
  state: (): listStore => ({ needScrollList: false, eventRequestLimit: 20 }),
  // getters: {
  //   getViewStartIdx: (state): listStore['viewStartIdx'] => state.viewStartIdx,
  // },
  // actions: {
  //   changeViewStartIdx(idx: number) {
  //     this.viewStartIdx = idx
  //   }
  // },
})