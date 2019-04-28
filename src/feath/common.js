import url from './server/url'
import { get, post } from './server/http.js'
import axios from 'axios'

export default {
  dataChainSave (params) {
    return post(url.dataChainSave, params)
  },
  dataChainUpdate (params) {
    return post(url.dataChainUpdate, params)
  },
  dataChainList (params) {
    return post(url.dataChainList, params)
  },
  dataChainGet (params) {
    return post(url.dataChainGet, params)
  },
  dataChainOn (params) {
    return post(url.dataChainOn, params)
  },
  complaintUpload (params) {
    return post(url.complaintUpload, params)
  },
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
  checkCode (params) {
    return post(url.checkCode, params)
  },
  login (params) {
    return post(url.login, params)
  },
  getOrgStatus (params) {
    return post(url.orgStatus, params)
  },
  register (params) {
    return post(url.register, params)
  },
  reregister (params) {
    return post(url.reregister, params) 
  },
   getOrgStatus (params) {
    return post(url.getOrgStatus, params)
  },
  getOrgList (params) {
    return post(url.getOrgList, params)
  },
  getOrgDetail (params) {
    return post(url.getOrgDetail, params)
  },
  orgPass (params) {
    return post(url.orgPass, params)
  },
  orgRefuse (params) {
    return post(url.orgRefuse, params)
  },
  chiansGet (params) {
    return post(url.chiansGet, params)
  },
  getStatisticsChain (params) {
    return post(url.getStatisticsChain, params)
  }
}
