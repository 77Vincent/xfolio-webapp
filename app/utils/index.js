import { Request } from './request'

import Log from './Log'

const Fn = {
  getBase64(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      Log.info(reader.result)
    }
    reader.onerror = (error) => {
      Log.info('Error: ', error)
    }
  },
}

export {
  Fn,
  Log,
  Request,
}
