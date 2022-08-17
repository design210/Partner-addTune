import TopUi from '@components/common/top/TopUi'
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'

describe('<TopUi/>', () => {
  it('has text 메인페이지', () => {
    render(
      <RecoilRoot>
        <TopUi />
      </RecoilRoot>,
    )
    screen.getByText('정산')
  })
})
