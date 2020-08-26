import React from 'react';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
import './index.less';

export const blonList = (filesArr, props) => {
  filesArr.sort(function(a, b) {
    return a.split('.')[0] - b.split('.')[0];
  })
  return filesArr.map((file) => {
    return <p className="file_list" onClick={() => {
      props.history.push(`${props.location.pathname}/detail?fileName=${file}`)
    }} key={file}>{file}</p>
  })
};