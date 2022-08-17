interface noticeDetailType {
  code: number
  data: {
    sid: number
    title: string
    content: string
    createName: string
    categorys: string
    categoryNames: string
    createdAt: string
  }
  message: null
}

interface noticeDetailDataType {
  sid: number
  title: string
  content: string
  createName: string
  categorys: string
  categoryNames: string
  createdAt: string
  files: Array<File>
}

interface contactDetailDataType {
  answer?: string | null
  answerDate: string
  content: string
  date: string
  files: Array<file>
  sid: number
  status: string
  statusName: string
  title: string
  type: string
}
interface file {
  sid: string
  name: string
}
export type { noticeDetailType, noticeDetailDataType, contactDetailDataType }
