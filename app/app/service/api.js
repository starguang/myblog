'use strict'

const { Service } = require('egg')
const fs = require('fs')
const path = require('path')
// const hyperDown = require('hyperdown')

const staticPath = path.join('./app/static')

const fileDisplay = (filePath, type) => {
  const filesArr = fs.readdirSync(`${filePath}/${type}`);
  return filesArr;
}

const fileDetal = (filePath, type, fileName) => {
  const fileDetal = fs.readFileSync(`${filePath}/${type}/${fileName}`, 'utf8');
  return fileDetal;
}

class ApiService extends Service {
  async getList({ type = '', fileName = '' }) {
    let filesArr = [];
    if (type) {
      filesArr = fileDisplay(staticPath, type);
    }
    return {
      filesArr
    }
  }

  async getDetail({ type = '', fileName = '' }) {
    let filesDetail = '';
    if (type) {
      filesDetail = fileDetal(staticPath, type, fileName);
    }
    return {
      filesDetail
    }
  }

}

module.exports = ApiService
