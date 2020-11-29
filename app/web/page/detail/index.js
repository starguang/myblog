import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import qs from 'qs';
import './index.less'

function Another (props) {
  const { filesArr = [], filesDetail = '' } = props;
  return (
    <div className='detail_content'>
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
    return (await axios.get(`/api/getDetail?type=${type}&fileName=${fileName}`, { timeout: 500 })).data
  }
  const type = ctx.request.url.split('/')[1];
  const fileName = qs.parse(ctx.request.url.split('?')[1]).fileName;
  return ctx.service.api.getDetail({ type, fileName })
}

export default Another
