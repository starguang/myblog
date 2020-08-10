import React from 'react';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom' 
export const blonList = (filesArr, props) => {
  return filesArr.map((file) => {
    return <p onClick={() => {
      props.history.push(`${props.location.pathname}/detail?fileName=${file}`)
    }} key={file}>{file}</p>
    // return <Link path='/123'/>
  })
};