
import React from 'react'
import serialize from 'serialize-javascript'
import { NavLink  } from 'react-router-dom'
import '@/assets/common.less'
import './index.less'

const commonNode = props => (
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ?  props.children  : ''
  props.children
    ? <div className='normal'>
        <h1 className='title'>
          <NavLink className="myNav" activeClassName='active' to='/home'>主页</NavLink>
          <NavLink className="myNav" activeClassName='active' to='/myweb'>前端思考</NavLink>
          <NavLink className="myNav" activeClassName='active' to='/read-notes'>读书笔记</NavLink>
          <NavLink className="myNav" activeClassName='active' to='/another'>随笔</NavLink>
          <NavLink className="myNav" activeClassName='active' to='/extract'>摘抄</NavLink>
        </h1>
        {props.children}
      </div>
    : ''
)

const Layout = (props) => {
  if (__isBrowser__) {
    return commonNode(props)
  } else {
    const { serverData } = props.layoutData
    const { injectCss, injectScript } = props.layoutData.app.config
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta name='theme-color' content='#000000' />
          <title>React App</title>
          {
            injectCss && injectCss.map(item => <link rel='stylesheet' href={item} key={item} />)
          }
        </head>
        <body>
          <div id='app'>{ commonNode(props) }</div>
          {
            serverData && <script dangerouslySetInnerHTML={{
              __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(serverData)}` // 使用pathname作为组件初始化数据的隔离，防止props污染
            }} />
          }
          <div dangerouslySetInnerHTML={{
            __html: injectScript && injectScript.join('')
          }} />
        </body>
      </html>
    )
  }
}

export default Layout
