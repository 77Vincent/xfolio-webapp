import {
  Request
} from './request'

const Fn = {
  getBase64(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      console.log(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }
}

export {
  Fn,
  Request,
}