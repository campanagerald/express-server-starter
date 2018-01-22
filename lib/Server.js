const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')

class Server {
  
  constructor(port, host, options) {
    this.port = port
    this.host = host
    this.opt = options
    
    this.app = express()
    
    if(this.opt) {
      if(this.opt.cors) {
        this.app.use(cors(this.opt.cors))
      }
    }
    
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    
    this.server = http.createServer(this.app)  
  }

  start(callback) {
    this.server.listen(this.port, this.host, callback)
  }

  getApp() {
    return this.app
  }
}

module.exports = Server