interface myStoreListType {
  code: number
  message: null | string
  data: {
    header?: {
      total?: number
      stores?: Array<storesType>
    }
    body?: {
      content: Array<storeListType>
      pageable?: {
        sort: {
          empty: boolean
          sorted: boolean
          unsorted: boolean
        }
        offset: number
        pageNumber: number
        pageSize: number
        paged: boolean
        unpaged: boolean
      }
      totalPages: number
      totalElements: number
      last: boolean
      size: number
      number: number
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      numberOfElements: number
      first: boolean
      empty: boolean
    }
  }
}
interface storesType {
  sid: string
  name: string
  count: number
}
interface storeListType {
  sid?: number
  storeName?: string
  title?: string
  period?: string
  status?: string
}

export type { myStoreListType, storesType, storeListType }
