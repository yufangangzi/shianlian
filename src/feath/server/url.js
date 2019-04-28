let domain = ''

export default {
  dataChainSave: domain + '/dataChain/save',
  dataChainUpdate: domain + '/dataChain/update',
  dataChainList: domain + '/dataChain/list',
  dataChainGet: domain + '/dataChain/get',
  dataChainOn: domain + '/dataChain/dataOnChain',
  complaintUpload: domain + '/complaint/complaint',
  backList: domain + '/userBack/list',
  backSave: domain + '/userBack/save',
  backRemove: domain + '/userBack/remove',
  backUpdate: domain + '/userBack/update',
  getAPI: domain + '/statisticalReportBack/getAPI',
  getVerify: domain + '/userBack/getVerify',
  login: domain + '/userBack/login',
  orgStatus: domain + '/organization/status',
  register: domain + '/organization/register',
  reregister: domain + '/organization/reregister',  
  getOrgStatus: domain + '/organization/status',
  getOrgList: domain + '/organization/list',
  getOrgDetail: domain + '/organization/detail',
  orgPass: domain + '/organization/pass',
  orgRefuse: domain + '/organization/refuse',
  chiansGet: domain + '/organization/chains',
  checkCode: domain + '/organization/check',
  getStatisticsChain: domain + '/statisticalReportBack/getStatisticsChain'
}