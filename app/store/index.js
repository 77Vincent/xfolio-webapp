import { init } from '@rematch/core'
import ImmerPlugin from '@rematch/immer'
import * as models from './models'

const immer = new ImmerPlugin()

const store = init({
  models,
  plugins: [immer],
})

export default store
