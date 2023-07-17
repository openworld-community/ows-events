import { defineStore } from 'pinia'

type listStore = {viewStartIdx: number, listSelector: HTMLElement | null, needScrollList: boolean}

export const useListStore = defineStore('eventList', {
  state: (): listStore => ({ viewStartIdx: 0, listSelector: null, needScrollList: false }),
  // getters: {
  //   getViewStartIdx: (state): listStore['viewStartIdx'] => state.viewStartIdx,
  // },
  // actions: {
  //   changeViewStartIdx(idx: number) {
  //     this.viewStartIdx = idx
  //   }
  // },
})