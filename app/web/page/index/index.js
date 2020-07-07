import React from 'react'
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom'
import './index.less'

function Page (props) {
  const { filesArr } = props;
  const blonList = () => {
    return filesArr.map(file => {
      return <p key={file}>{file}</p>
    })
  }
  return (
    <div className='normal'>
      <div className='welcome' />
      <p>自我介绍:</p>
      <p>前端开发一枚，也算心血来潮想搭建一个自己的个人博客，写点自己的看法，现在只有一些文章，之后会考虑留言功能</p>
      {blonList()}
      {/* <ReactMarkdown
        source={props.listData}
        escapeHtml={false}
        // renderers={{
        //   code: CodeBlock,
        // }}
      /> */}
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  if (__isBrowser__) {
    return (await window.fetch('/api/getList')).json()
  }
  return ctx.service.api.getList()
  // return __isBrowser__ ? (await window.fetch('/api/getIndexData')).json() : ctx.service.api.index()
}

export default Page
