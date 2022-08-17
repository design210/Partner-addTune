import React, { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { useQuery } from 'react-query'
import { fileView } from '@api/common/Common'
import styles from '@style/common/modal.module.scss'
import Button from '@components/common/Button'
import CircularProgress from '@components/common/CircleProgress'
import { useTranslation } from 'react-i18next'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`
const Contract = ({ id }: { id: string }): JSX.Element => {
  const { t } = useTranslation()
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages)
  }
  const { data } = useQuery<any, Error>(['fileView', id], async id => await fileView(id), {
    suspense: false,
    enabled: true,
  })
  const download = () => {
    if (data) {
      var file = new Blob([data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = fileURL
      link.download = `${t('contract')}.pdf`
      link.click()
    }
  }
  return (
    <>
      <div className={styles.pdfWrap}>
        <Document
          file={{ data: data }}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className={styles.pdfLoading}>
              <CircularProgress size={50} thickness={5} />
            </div>
          }
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className={styles.pdfUi}>
        <span onClick={() => (pageNumber > 1 ? setPageNumber(pageNumber - 1) : null)} className={styles.prev}>
          <img src={`${process.env.PUBLIC_URL}/assets/img/prev.svg`} alt="prev" />
        </span>
        <span className={styles.page}>
          Page {pageNumber} / {numPages}
        </span>
        <span onClick={() => (pageNumber < numPages! ? setPageNumber(pageNumber + 1) : null)} className={styles.next}>
          <img src={`${process.env.PUBLIC_URL}/assets/img/next.svg`} alt="next" />
        </span>
        <span className={styles.btn}>
          <Button name={t('download')} onclick={download} className="btnblueBg" />
        </span>
      </div>
    </>
  )
}

export default Contract
