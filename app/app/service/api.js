'use strict'

const { Service } = require('egg')
const fs = require('fs')
const path = require('path')
// const hyperDown = require('hyperdown')

const staticPath = path.join('./app/static')

const fileDisplay = (filePath) => {
  const filesArr = fs.readdirSync(filePath);
  return filesArr;
}

class ApiService extends Service {
  index () {
    return {
      news: [
        {
          id: '1',
          title: 'Racket v7.3 Release Notes'
        },
        {
          id: '2',
          title: 'Free Dropbox Accounts Now Only Sync to Three Devices'
        },
        { id: '3',
          title: 'Voynich Manuscript Decoded by Bristol Academic'
        },
        { id: '4',
          title: 'Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic'
        },
        { id: '5',
          title: 'How much do YouTube celebrities charge to advertise your product? '
        }
      ]
    }
  }
  async getList() {
    const filesArr = fileDisplay(staticPath);
    // const listData = fs.readFileSync(staticPath,'utf-8')
    return {
      filesArr
    }
  }
}

module.exports = ApiService
