import React from 'react'
import axios from 'axios'
import { blonList } from '../../common/index'
// import './index.less'

function Extract (props) {
  const { filesArr = [] } = props
  return (
    <div className='normal'>
      <div className='welcome' />
      {blonList(filesArr, props)}
    </div>
  )
}

Extract.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await axios.get('/api/getList?type=extract'), { timeout: 500 }).data : ctx.service.api.getList({type: 'extract'})
}

export default Extract
