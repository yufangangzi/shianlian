import url from './server/url'
import { get, post } from './server/http.js'
import axios from 'axios'

export default {
  backList (params) {
    return post(url.backList, params)
  },
}
