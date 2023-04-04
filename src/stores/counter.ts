import { defineStore } from 'pinia'
import { getApiList } from '../server'
import type { MapType } from './type'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    list: [] as MapType[]
  }),
  actions: {
    async getList() {
      const result = await getApiList()
      this.list = result.data || []
    }
  }
})
