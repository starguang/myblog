import React from 'react'
import axios from 'axios'
import { blonList } from '../../common/index'
// import './index.less'

function Another (props) {
  const { filesArr = [] } = props;
  return (
    <div className='normal'>
      <div className='welcome' />
      {blonList(filesArr, props)}
    </div>
  )
}

Another.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  if (__isBrowser__) {
    const data = await axios.get('/api/getList?type=other', { timeout: 1000 })
    return data.data
  }
  return ctx.service.api.getList({type: 'other'})
}

export default Another
