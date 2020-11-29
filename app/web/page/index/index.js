import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios'
import './index.less'

function Page (props) {
  const { filesArr = [] } = props;
  const blonList = () => {
    return filesArr.map(file => {
      return <p key={file}>{file}</p>
    })
  };
  return (
    <div className='normal'>
      <div className='index_content'>
        <p>自我介绍:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;前端开发一枚，也算心血来潮想搭建一个自己的个人博客，写点自己的看法，现在只有一些文章，之后会考虑留言功能</p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;稍微介绍下搭建过程吧，从某云买了一个服务器，自己搭建了一套服务，后端用node（因为不会Java），
          用nigx代理到80端口，因为node服务不让监听80端口，前端是react。
          从买服务器到今天2020年08月19日大概快两个月了，不过终于能看了，虽然样式还是很丑，有什么建议可以跟我说下，虽然还没有留言功能，
          不过我在考虑中了。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;然后呢会不定期发表点文档，当然更新时间很不固定。
        </p>
      </div>
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  if (__isBrowser__) {
    return (await axios.get('/api/getList'), { timeout: 500 }).data
  }
  return ctx.service.api.getList({ type: '' })
}

export default Page
