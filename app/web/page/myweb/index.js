import React from 'react'
import { Link } from 'react-router-dom'
import { blonList } from '../../common/index'
// import './index.less'

function Myweb (props) {
  const { filesArr = [] } = props;
  // const blonList = () => {
  //   return filesArr.map(file => {
  //     return <p key={file}>{file}</p>
  //   })
  // };
  return (
    <div className='normal'>
      <div className='welcome' />
      <p>hello。前端思考</p>
      {blonList(filesArr, props)}
    </div>
  )
}

Myweb.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  if (__isBrowser__) {
    return (await window.fetch('/api/getList?type=webLearn')).json()
  }
  return ctx.service.api.getList({type: 'webLearn'})
}

export default Myweb
