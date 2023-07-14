import { defineStore } from 'pinia'

type listStore = {viewStartIdx: number, listSelector: HTMLElement | null}

export const useListStore = defineStore('eventList', {
  state: (): listStore => ({ viewStartIdx: 0, listSelector: null }),
  // getters: {
  //   getViewStartIdx: (state): listStore['viewStartIdx'] => state.viewStartIdx,
  // },
  // actions: {
  //   changeViewStartIdx(idx: number) {
  //     this.viewStartIdx = idx
  //   }
  // },
})