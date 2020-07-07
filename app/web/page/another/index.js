import React from 'react'
import { Link } from 'react-router-dom'
// import './index.less'

function Another (props) {
  return (
    <div className='normal'>
      <div className='welcome' />
      <p>hello。suiji </p>
    </div>
  )
}

Another.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Another
