import React from 'react'
import { Link } from 'react-router-dom'
import { blonList } from '../../common/index'
// import './index.less'

function ReadNotes (props) {
  const { filesArr = [] } = props;
  return (
    <div className='normal'>
      <div className='welcome' />
      <p>hello。读书笔记</p>
      {blonList(filesArr)}
    </div>
  )
}

ReadNotes.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__ ? (await window.fetch('/api/getList?type=read-notes')).json() : ctx.service.api.getList({type: 'read-notes'})
}

export default ReadNotes
