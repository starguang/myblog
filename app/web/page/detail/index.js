import React from 'react'
import { Link } from 'react-router-dom'
import { blonList } from '../../common/index'
import ReactMarkdown from 'react-markdown'
import qs from 'qs';
// import './index.less'

function Another (props) {
  const { filesArr = [], filesDetail = '' } = props;
  return (
    <div className='normal'>
      <div className='welcome' />
      <p>lalalal </p>
      {/* {blonList(filesArr)} */}
      <ReactMarkdown
        source={filesDetail}
        escapeHtml={false}
      />
    </div>
  )
}

Another.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  
  if (__isBrowser__) {
    const fileName = qs.parse(ctx.location.search.split('?')[1]).fileName;
    const type = ctx.location.pathname.split('/')[1];
    return (await window.fetch(`/api/getDetail?type=${type}&fileName=${fileName}`)).json()
  }
  const type = ctx.request.url.split('/')[1];
  const fileName = qs.parse(ctx.request.url.split('?')[1]).fileName;
  return ctx.service.api.getDetail({ type, fileName })
}

export default Another
