import url from './server/url'
import { get, post } from './server/http.js'
import axios from 'axios'

export default {
  backList (params) {
    return post(url.backList, params)
  },
  backSave (params) {
    return post(url.backSave, params)
  },
  backRemove (params) {
    return post(url.backRemove, params)
  },
  backUpdate (params) {
    return post(url.backUpdate, params)
  },
  getAPI (params) {
    return post(url.getAPI, params)
  },
  getVerify (params) {
    return get(url.getVerify, params)
  },
  login (params) {
    return post(url.login, params)
  },
  register (params) {
    return post(url.register, params)
  },
  getOrgStatus (params) {
    return post(url.getOrgStatus, params)
  },
  getOrgList (params) {
    return post(url.getOrgList, params)
  },
  getOrgDetail (params) {
    return post(url.getOrgList, params)
  },
  orgPass (params) {
    return post(url.orgPass, params)
  },
  orgRefuse (params) {
    return post(url.orgRefuse, params)
  }
}
