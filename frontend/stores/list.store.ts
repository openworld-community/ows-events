import { defineStore } from 'pinia'

type listStore = {viewStartIdx: number, needScrollList: boolean}

export const useListStore = defineStore('eventList', {
  state: (): listStore => ({ viewStartIdx: 0, needScrollList: false }),
  // getters: {
  //   getViewStartIdx: (state): listStore['viewStartIdx'] => state.viewStartIdx,
  // },
  // actions: {
  //   changeViewStartIdx(idx: number) {
  //     this.viewStartIdx = idx
  //   }
  // },
})