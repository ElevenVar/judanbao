/*接口地址配置  上传请打开*/
// export const  baseUrl = process.env.API_ROOT;

// export const baseUrl = 'http://192.168.18.85:8081/'; //本地测试地址--曹振华
// export const baseUrl = 'http://192.168.18.73:8081/'; //唐
// export const baseUrl = 'http://192.168.18.233:8080/'; //本地测试2 -- 赵林
// export const baseUrl = 'http://192.168.18.104:8081/csc/'; //本地测试2 -- 何
// export const baseUrl = 'http://192.168.32.60:8080/'; //本地测试地址 -- 母国平
// export const baseUrl = 'http://192.168.18.108:8080/';//本地测试地址--潘超原
// export const baseUrl = 'http://192.168.18.111:8081/';//本地测试地址--徐灵
// export const baseUrl = 'http://192.168.18.131:8080/'; //本地测试地址--顾军
// export const baseUrl = 'http://192.168.18.150:8080/'; //本地测试地址--朱可男
// export const baseUrl = 'http://192.168.18.58:8080/';//本地测试地址--郑中贤
export const baseUrl = 'http://119.23.242.238:8080/'; //测试环境地址
// export const baseUrl = 'http://47.106.145.191:8080/'; // UAT 环境
// export const baseUrl = '/'; //本地打包地址
const u = {
	"baseUrl": baseUrl,
	/*字典表查询相关*/
	'distList': baseUrl + 'common/getDictionariesByLabel', //字典表查询（公用
	"getDictionariesByLabel": baseUrl + "common/getDictionariesByLabel", //字典表查询
	"getCenterName": baseUrl + "common/getCenterName", //营业公用
	"getBrachId":baseUrl+ "common/getBrachId", // 分中心 催收案件管理（12.25
	"getOrgNO": baseUrl + "common/getOrgId", //营业部
	"getTeamList": baseUrl + "common/getTeamList", //团队列表

	/*登录页面*/
	"getValidUID": baseUrl + 'getValidCodeUID', //获取uid
	"login": baseUrl + "doLogin",//登录按钮
	"index": baseUrl + "menu/list", //菜单查询
	"getValidCode": baseUrl + "getValidCode", //验证码接口

	/*忘记密码*/
	'findPhoneByName': baseUrl + 'modifyPwd/findPhoneByName', //修改密码  查询电话号码
	'sendSmsVerificationCode': baseUrl + 'modifyPwd/sendSmsVerificationCode', //获取验证码
	'checkOutVerificationCode': baseUrl + 'modifyPwd/checkOutVerificationCode', //验证验证码
	'modifyPwdByVerificationCode': baseUrl + 'modifyPwd/modifyPwdByVerificationCode', //提交新密码

	/* 首页*/
	//---------------home.vue组件
	'homeToBeAudit': baseUrl + 'home/statisticsToBeAudited', //首页 -- 首页待审批案件  （待审核 收到）
	'statisticsApplyInfo': baseUrl + 'home/statisticsApplyInfo', //首页 -- 首页待审批案件  （申请 发起）
	'homeAuditDy': baseUrl + 'home/auditedDynamics', //首页 -- 首页审批动态
	'homeCaseSit': baseUrl + 'home/caseSituation', //首页 -- 首页案件处理情况
	'homeCaseCov': baseUrl + 'home/caseCover', //首页 -- 首页案件处理情况
	'getNoticeByHome': baseUrl + 'sysnotice/getNoticeByHome', //系统通知--首页三条消息提示、及红点通知
	"auditedDynamicsDetails":baseUrl+ "home/auditedDynamicsDetails", //更多申请 查询
	"DictionaryGetDictionariesByLabel":baseUrl +"dictionary/getDictionariesByLabel", // 获取审核状态

	//---------------index.vue组件
	"loginOut": baseUrl + "logout", //退出登录
	"signIn": baseUrl + "signIn", // 签到
	'editPassWord': baseUrl + 'modifyPwd/modifyPwdByOldPwd', //根据账号修改密码
	"downloadUseGuide": baseUrl + "downloadUseGuide", //帮助文档

	//---------------青牛相关
	'qnGetUser': baseUrl + 'qingniu/getSeatByUser', //青牛获取用户坐席分机
	'qnSignInOut': baseUrl + 'qingniu/signInAndOut', //青牛  签入--签出
	'qnGetphoneBackCase': baseUrl + 'qingniu/qingniuBackByPhone', //青牛预测试外呼
	'getExplicitNoList': baseUrl + 'qingniu/getExplicitNoList', //外显号码查询

	/* 催收案件管理 */
	"collectCase": baseUrl + 'urgeCaseManage/caseList', //查询数据
	"collectCaseCount": baseUrl + 'urgeCaseManage/caseListCount', //查询数据总条数
	"TestingDownloadCaseExcel": baseUrl + "excelHelpper/check/downloadCaseExcel", // 检测导出数据量
	"downloadCaseExcel": baseUrl + "excelHelpper/downloadCaseExcel", // 导出数据
	"qingniuRevokeOutbound":baseUrl+"qingniu/revokeOutbound",//撤销预测外呼
	"downloadExcelTemp2": baseUrl + "excelHelpper/downloadExcelTemp2", //委外下载模板

	/* 电催案件管理 */
	//--------------我的电催案件
	"getMyElectricUrgingCase": baseUrl + "case/getMyElectricUrgingCase", // 数据查询
	"getMyElectricUrgingCaseCount": baseUrl + "case/getMyElectricUrgingCaseCount", // 数据查询总条数
	"TestingDownloadMyCaseExcel": baseUrl + "excelHelpper/check/downloadMyCaseExcel", //检测导出数据量
	"downloadMyCaseExcel": baseUrl + "excelHelpper/downloadMyCaseExcel", // 导出数据
	
	//-------------我已完成案件
	"getMyFinishCase": baseUrl + "case/getMyFinishCase", //数据查询（全部，已出催
	"getMyFinishCaseCount": baseUrl + "case/getMyFinishCaseCount", //数据总条数（全部，已出催
	"TestingDownloadMyFinishCaseExcel": baseUrl + "excelHelpper/check/downloadMyFinishCaseExcel", //检测导出数据量（全部，已出催
	"downloadMyFinishCaseExcel":baseUrl + "excelHelpper/downloadMyFinishCaseExcel", // 导出数据 (全部，已出催)
	"getSettleCase": baseUrl + "case/getSettleCase", //数据查询-已结清
	"getSettleCaseCount": baseUrl + "case/getSettleCaseCount", //数据总条数-已结清
	"TestingDownloadSettleCaseExcel": baseUrl + "excelHelpper/check/downloadSettleCaseExcel", //检测导出数据量（已结清
	"downloadSettleCaseExcel": baseUrl + "excelHelpper/downloadSettleCaseExcel", //导出数据（已结清
	"settleProofProveApply": baseUrl + "settleProof/Apply", //发起申请（结清证明 

	/* 委外案件管理 */
  //---------------我的委外案件
	"MywwcaseListwwcaseCount":baseUrl+ "mywwcase/listwwcaseCount", // 查询数据总条数
   "getDictionariesByType":baseUrl+"common/getDictionariesByType", // 流程配置获取 数据来源
	"outsidecase": baseUrl + "mywwcase/listwwcase", //数据查询
	"caseallot": baseUrl + "mywwcase/allot", //委外 --分案
	"casestop": baseUrl + "mywwcase/Stop", //委外 -- 停催
	"addReserver": baseUrl + "reserver/addReserver", //委外 -- 划扣（公用
	"TestingExportInfo": baseUrl + "excelHelpper/check/downloadWwExcel", // 检测导出数据量
	"exportInfo": baseUrl + "excelHelpper/downloadWwExcel", // 导出数据
	"importWwExcel": baseUrl + "excelHelpper/importWwExcel", //导入数据
	"batchOutsouringExport1":baseUrl +"mywwcase/batchOutsouringExport",  //分案导入
	"downloadCurrentExcelTemp1":baseUrl+"mywwcase/downloadCurrentExcelTemp",//分案模板下载(公用)
	"excelHelpper": baseUrl + "excelHelpper/downloadOutsouringBaclExcelTemp", //下载回案模板
	"casehold": baseUrl + "mywwcase/hold", //留案
	"caseback": baseUrl + "mywwcase/back", //回案
	"activationCase": baseUrl + "mywwcase/activationCase", //激活（公用

	//-------------委外公司管理
	"listCompany": baseUrl + "outCompany/ListCompany", //委外公司管理
	"outcompanyAdd": baseUrl + "outCompany/add", //添加
	"lookdetailsInfo": baseUrl + "outCompany/OutCompanyInfo", //查看
	"outcompanyUpdate": baseUrl + "outCompany/update", //修改
	"outcompanyDisable": baseUrl + "outCompany/disable", //禁用
	"outcompanyRedisable": baseUrl + "outCompany/redisable", //启用
	"outcompanyDelete": baseUrl + "outCompany/delete", //删除
	"recordList": baseUrl + "outCompany/recordList", //委外公司列表-查看-客户分配记录

	// ------------历史分案记录
	"historyCaseList": baseUrl + "mywwcase/CaseRecord", //分案历史 数据查询
	"overCaseList":baseUrl + "mywwcase/overCaseList", // 已结清数据查询
	"TestingDownloadWwAccountRecordExcel": baseUrl + "excelHelpper/check/downloadWwAccountRecordExcel", // 分案历史 检测导出数据量
	"downloadWwAccountRecordExcel": baseUrl + "excelHelpper/downloadWwAccountRecordExcel", //分案历史 导出数据
	"downloadOverOutsouringExcel":baseUrl+"mywwcase/check/downloadOverOutsouringExcel", // 已结清 检测导出数据量
	"MywwcaseDownloadOverOutsouringExcel":baseUrl+"mywwcase/downloadOverOutsouringExcel", // 已结清 导出数据
	"downLoadJqModel": baseUrl + "settleProof/downLoadJqModel", //下载结清证明申请（公用接口
	'queryWwCompanyList': baseUrl + 'common/queryWwCompanyList', //委外公司下拉列表

	/*停催案件管理*/
	"stopUrgeList": baseUrl + "stopUrge/list", //默认查询
	"activationStop": baseUrl + "stopUrge/activationStop", //停催激活
	"downloadExcelTemp": baseUrl + "excelHelpper/downloadExcelTemp", //停催下载模板
	"importStopUrgeExcel": baseUrl + "excelHelpper/importStopUrgeExcel", //停催导入
	"exportStopUrgeExcel": baseUrl + "excelHelpper/downloadStopUrgeExcel", //停催导出

	/* 案件审核管理 */
	//-----------------停催申请审核
	"caseCheckList": baseUrl + "stopUrgeCheck/list", //默认查询数据
	"CheckList": baseUrl + "stopUrgeCheck/updateCheckList", //  停催申请审核 （审核接口  option: Y 通过， N 拒绝
	"updateCheckLists": baseUrl + "stopUrgeCheck/updateCheckLists", // 停催申请审核 （批量审核
	"downloadStopUrgeCheckExcel": baseUrl + "excelHelpper/downloadStopUrgeCheckExcel", // 数据导出
	"TestingDownloadStopUrgeCheckExcel": baseUrl + "excelHelpper/check/downloadStopUrgeCheckExcel", // 检测导出数据量
	'getCheckRoute': baseUrl + 'bcmpBreasy/getCheckRoute',//查看审核流程(公用)

	//-----------------提前委外审核
	"outSourcingAdvance": baseUrl + "outSourcingAdvance/list", // 数据查询
	"outSourcingAdvanceGetCheckRoute": baseUrl + "outSourcingAdvance/getCheckRoute", //提前委外审核查看审核流程
	"stopUrgeCheckGetCheckRoute": baseUrl + "stopUrgeCheck/getCheckRoute", //停催申请审核 查看流程
	"outSourcingAdvanceUpdate": baseUrl + "/outSourcingAdvance/update", // 提前委外审核（审核接口 option）
	"updateBatch": baseUrl + "outSourcingAdvance/updateBatch", // 批量审核提前委外数据
  "TestingdownloadOutsourcingAdvanceExcel": baseUrl + "excelHelpper/downloadOutsourcingAdvanceExcel", // 检测导出数据量
	"downloadOutsourcingAdvanceExcel": baseUrl + "excelHelpper/downloadOutsourcingAdvanceExcel", // 数据导出

	//-----------------信函审核
	"letterReviewList": baseUrl + "letterReview/list", //数据查询
	"refuseCheck": baseUrl + "letterReview/refuseCheck", //审核拒绝（单条
	"batchRefuseCheck": baseUrl + "letterReview/batchRefuseCheck", //审核拒绝（批量
	"singleReview": baseUrl + "letterReview/singleReview", //审核通过（单条
	"batchReview": baseUrl + "letterReview/batchReview", //审核通过（批量
	"processQuery": baseUrl + "letterReview/processQuery", // 查看信函审核  审核流程（公用

	//-----------------信修审核
	"queryAuditList": baseUrl + "bcmpBreasy/queryAuditList", // 百融信修审核 数据列表
	"bcmpBreasyReview": baseUrl + "bcmpBreasy/review", // 百融信修审核 （5：审核通过，6: 审核拒绝）

	/*策略规则配置*/
	//-----------------策略配置
	"getAllRule": baseUrl + "ruleManager/getAllRule", // 默认查询分案策略配置
	"productTypeServerLineList": baseUrl + "productType/productTypeServerLineList", // 查询产品类型
	"deleteRule": baseUrl + "ruleManager/deleteRule", // 删除分案策略配置
	"getRuleEdit": baseUrl + "ruleManager/getRuleEdit", //策略配置查看
	"saveOrUpdateRule": baseUrl + "ruleManager/saveOrUpdateRule", //策略配置（新增，修改
	'teamList': baseUrl + "teamManage/teamList", //查询团队（公用

	//-----------------案件分配
	"HandleCurrentInfoList": baseUrl + "currentHandle/HandleCurrentInfoList", // 查询案件分配列表
	"checkTeam": baseUrl + "currentHandle/checkTeam", // 判断选择的团队是否相等 （暂时取消
	"HandleCurrentInfoManual": baseUrl + "currentHandle/HandleCurrentInfoManual", // 手动分案（添加
	"getCurrentCountByTeamNo": baseUrl + "currentHandle/getCurrentCountByTeamNo", // 查询选中团队下面可以分配案件的数量
	"CurrentInfoByAvgCapital": baseUrl + "currentHandle/CurrentInfoByAvgCapital", // 平均剩余本金分配
	"CurrentInfoByAvgHs": baseUrl + "currentHandle/CurrentInfoByAvgHs", // 平均 按户分配
	"CurrentInfoByAvgOverDue": baseUrl + "currentHandle/CurrentInfoByAvgOverDue", // 平均按逾期金额分配
	"CurrentInfoByQuotaCapital": baseUrl + "currentHandle/CurrentInfoByQuotaCapital", // 配额按剩余本金分配
	"CurrentInfoByQuotaHs": baseUrl + "currentHandle/CurrentInfoByQuotaHs", // 配额按户数分配
	"CurrentInfoByQuotaOverDue": baseUrl + "currentHandle/CurrentInfoByQuotaOverDue", // 配额按逾期金额
	"CurrentInfoByTotal": baseUrl + "currentHandle/CurrentInfoByTotal", //累计分配
	"currentImport": baseUrl + "currentHandle/currentImport", // 导入分案数据
	"downloadCurrentExcelTemp": baseUrl + "excelHelpper/downloadCurrentExcelTemp", // 案件分配模板 下载
	"TestingCurrentExport": baseUrl + "currentHandle/check/currentExport", // 检测导出数量
	"currentExport": baseUrl + "currentHandle/currentExport", // 导出数据

	//------------回收改派
	'queryRecyclableCaseDetails': baseUrl + "currentHandle/queryRecyclableCaseDetails", //回收改派
	'TestingDownloadRecyclableCaseExcel': baseUrl + "currentHandle/check/downloadRecyclableCaseExcel", //检测导出数据量
	'downloadRecyclableCaseExcel': baseUrl + "currentHandle/downloadRecyclableCaseExcel", //导出数据
	'manualRecoveryCase': baseUrl + "urgeCaseManage/manualRecoveryCase", //手工回收
	'getCurrentInfoByTeamNo': baseUrl + "teamManage/getCurrentInfoByTeamNo", //根据团队ID查询团队成员
	'getDynamicRecoveryCaseCount': baseUrl + "urgeCaseManage/getDynamicRecoveryCaseCount", //查询批量回收总数
	'dynamicRecoveryCase': baseUrl + "urgeCaseManage/dynamicRecoveryCase", //自动回收

	/*业务查询*/
	//------------借款查询
	"getMoney": baseUrl + "business/loanList",
	"getMoneyCount": baseUrl + "business/loanListCount", //总条数
	"downloadLoanListExcel": baseUrl + "excelHelpper/downloadLoanListExcel", // 导出

	//------------还款查询
	"backMoney": baseUrl + "business/repaymentList",
	"backMoneyCount": baseUrl + "business/repaymentListCount", //总条数
	"downloadRepaymentListExcel": baseUrl + "excelHelpper/downloadRepaymentListExcel", // 导出

	/*系统管理*/
	//------------公司管理
	"company": baseUrl + 'company/qurey', //公司管理查询
	"companyAdd": baseUrl + 'company/add', //公司管理-新增新公司
	"disable": baseUrl + 'company/disable', //公司管理-禁用
	"reDisable": baseUrl + 'company/reDisable', //公司管理-启用
	"companyUpdate": baseUrl + 'company/update', //公司管理-修改

	//------------机构管理
	'orgQuery': baseUrl + 'Org/query', //机构管理-查询
	'orgAdd': baseUrl + 'Org/add', //机构管理-添加
	'orgUpdate': baseUrl + 'Org/update', //机构管理-修改
	'orgDelete': baseUrl + 'Org/delete', //机构管理-删除
	'queryAllCollectionGroupRole': baseUrl + 'common/queryAllCollectionGroupRole',
	'getUCList': baseUrl + 'common/getUserCompanyList', //获取用户下的公司

	//------------角色管理
	'roleQuery': baseUrl + 'role/query', //角色管理-查询
	'queryJur': baseUrl + 'role/queryJur', //角色管理-查询菜单全部功能
	'updateRole': baseUrl + 'role/update', //角色管理-修改
	'addJur': baseUrl + 'role/addJur', //角色管理-添加新角色
	'listJur': baseUrl + 'role/listJur', //角色管理-查询角色
	'roleDisable': baseUrl + 'role/disable', //角色管理-启用角色
	'roleRedisable': baseUrl + 'role/redisable', //角色管理-禁用角色
	'addRole': baseUrl + 'role/add', //角色管理-添加新角色
	'findDataList': baseUrl + 'dataAuth/findDataAuthList', //角色管理----数据权限配置 列表查询
	'operateDataAuth': baseUrl + 'dataAuth/operateDataAuth', //角色管理----数据权限配置 操作数据权限

	//------------用户管理
	'userQuery': baseUrl + 'user/queryUser', //用户管理-查询
	'addUser': baseUrl + 'user/addUser', //用户管理-新增
	'deleteUser': baseUrl + 'user/deleteUser', //用户管理-删除
	'updateUser': baseUrl + 'user/update', //用户管理-修改
	'userManage': baseUrl + 'user/userManager', //用户管理-查询角色 部门（公用
	'getUOList': baseUrl + 'common/getUserOrgControList', //获取当前公司下的机构
	'getUJSelete': baseUrl + 'common/addUserJobSelected', //获取当前用户的公司的组织机构
	'queryCollectionGroupById': baseUrl + 'common/queryCollectionGroupById',// 查询组长

	//------------通知管理
	"Get_informManage": baseUrl + "informManage/list", //通知管理板块 模板类型 modelType:1-短信，2-邮件，3-信函
	"Dell_informManage": baseUrl + "informManage/delete", //删除通知管理 信息
	"AddInformManage": baseUrl + "informManage/add", // 新增模板
	"DetailInformManage": baseUrl + "informManage/detail", // 查询详情
	"UpdateInformManage": baseUrl + "informManage/update", //编辑模板

	//------------流程配置
	"aduitFowList": baseUrl + "route/List", //默认查询
	"aduitFowAdd": baseUrl + "route/add", //添加
	"aduitFowDelete": baseUrl + "route/delete", //删除流程
	"aduitFowModify": baseUrl + "route/modify", //修改流程
	"aduitFowRouteStep": baseUrl + "route/routeStep", //获取流程
	'queryProductTypeList': baseUrl + 'common/queryProductTypeList', //产品类型下拉列表
	"getDictionariesByTypes":baseUrl+"common/getDictionariesByType", // 流程配置获取 数据来源

	//------------青牛账号管理
	"userList": baseUrl + "qingniu/selectSeatUserList", //默认查询
	"accountNumberList": baseUrl + "qingniu/selectUserList", //聚担保账号下拉列表
	"saveOrUpdateSeatUser": baseUrl + "qingniu/saveOrUpdateSeatUser", //添加编辑账号
	"removeSeatUser": baseUrl + "qingniu/removeSeatUser", //删除账号
	"selectCaseNoByTeamNo": baseUrl + "qingniu/selectCaseNoByTeamNo", //青牛预测式外呼-->根据团队查询可可分配案件数，团队人员
	"getTeamInfoList": baseUrl + "qingniu/getTeamInfoList", //青牛预测式外呼-->获取团队列表
	"saveOutbound": baseUrl + "qingniu/saveOutbound", //青牛预测式外呼-->保存信息

	//------------系统通知
	'getNoticeList': baseUrl + 'sysnotice/getNoticeList', //系统通知获取列表
	'getReviceNoticeList': baseUrl + 'sysnotice/getReviceNoticeList', //获取系统信息列表 -  - 接收方
	'getNoticeServiceLine': baseUrl + 'sysnotice/getTeamInfoListByServiceLine', //系统通知 更具业务线查询 团队列表
	'getUrgeUserByTeam': baseUrl + 'sysnotice/getUrgeUserByTeam', //系统通知  根据催收团队获取团队人员
	'saveNotice': baseUrl + 'sysnotice/saveNotice', //系统通知 -保存
	'seeNotice': baseUrl + 'sysnotice/seeNotice', // 系统通知 -- 查看通知状态改变
	'getNoticeById': baseUrl + 'sysnotice/getNoticeById', //系统通知  --- 查看回显
	'deleteByIdkey': baseUrl + 'sysnotice/deleteByIdkey', //系统通知---删除

	/*百融服务*/
	//------------百融信修
	"bcmpBreasy_query": baseUrl + "bcmpBreasy/query", // 百融易搜 列表信息查询
	"checkImportedData": baseUrl + "bcmpBreasy/checkImportedData", // 百融信修的导入
	"repairImportedData": baseUrl + "bcmpBreasy/repairImportedData", // 保存导入的百融信修列表（开始信修）
	"exportCheckFailedList": baseUrl + "bcmpBreasy/exportCheckFailedList", // 导出错误的数据(导出错误)
	"bcmpBreasyExport": baseUrl + "bcmpBreasy/export", //导出数据
	"bcmpBreasySransferData": baseUrl + "bcmpBreasy/queryInstanceInfo", // 查看信修审核  审核流程
	"bcmpBreasyDownloadTemplet": baseUrl + "bcmpBreasy/downloadTemplet", //百融信修 模板下载
	/*财务管理*/
	//------------划扣管理
	"reserverList": baseUrl + "reserver/reserverList", //划扣列表
	"cancleReserver": baseUrl + "reserver/cancleReserver", //取消预约
	"exportReserverList": baseUrl + "reserver/exportReserverList", //划扣导出

	//------------提前结清申请（详情也用
	'queryRepaySettleInfo': baseUrl + 'earlyClear/queryRepaySettleInfo', //默认查询
	"queryInfoByLoanNo": baseUrl + "earlyClear/queryInfoByLoanNo", // 根据合同编号查询信息
	"queryReceAmtByLoanNo": baseUrl + "earlyClear/queryReceAmtByLoanNo", // 根据合同编号和减免类型查询合同金额
	"submitRemissionClearance": baseUrl + "earlyClear/submitRemissionClearance", //提交新增的提前结清申请
	"EarlyClearInfo": baseUrl + "EarlyClear/EarlyClearInfo", // 查看单条审核信息的详情（公用
	"upLoadImg": baseUrl + "dataHandle/upImgs", //上传文件
	"downloadRepaySettleInfoExcel": baseUrl + "excelHelpper/downloadRepaySettleInfoExcel", //导出
	"queryReasonType": baseUrl + "earlyClear/queryReasonType", //查看提前结清申请 字典表
	"EarlyClearRevoke": baseUrl + "EarlyClear/Revoke", //撤销

	//------------提前结清审核
	'queryRoutInfoById': baseUrl + 'earlyClear/queryRoutInfoById', //提前结清申请 --流程
	"EarlyClearList": baseUrl + "EarlyClear/EarlyClearList", //默认查询
	"EarlyClearCheckBatch":baseUrl+"EarlyClear/checkBatch", //批量审核
	"EarlyClearCheck": baseUrl + "EarlyClear/check", //通过
	"EarlyClearBack": baseUrl + "EarlyClear/Back", //拒绝
	"getCheckPrecess": baseUrl + "EarlyClear/getCheckPrecess", //查看审核流程
	"routeBack": baseUrl + "EarlyClear/routeBack", // 获取回退人

	//------------结清证明申请
	"settleProofDownLoadList": baseUrl + "settleProof/downLoadList", // 默认查询
	"exportActive": baseUrl + 'settleProof/exportActive', //导出
	"exportPoi": baseUrl + "settleProof/exportPoi", //导入模板下载
	"settleProofCheckImportedData": baseUrl + "settleProof/checkImportedData", //导入

	//-----------结清证明审核
	"settleProofList": baseUrl + "settleProof/proList", //默认查询
	"exportSettleProof": baseUrl + "settleProof/export", //导出
	"settleProofToExamine": baseUrl + "settleProof/TeamLeaderReview", // 结清证明审核  （ 0、审核通过 1、审核拒绝 2、待审核 3、审核中）
	"SettleProofTeamLeaderBatchReview":baseUrl+ "settleProof/TeamLeaderBatchReview", //批量审核
	"settleProofGetCheckRoute": baseUrl + "settleProof/getAuditProcess", // 查看结清证明审核流程和 结清证明页面
	//-----------代充值管理（合规部分 ）
	'ProxyrechargeListRechargeManage':baseUrl + 'proxyrecharge/listRechargeManage', //获取充值数据表
	'ProxyrechargeCheckProxyRecharge':baseUrl + 'proxyrecharge/checkProxyRecharge', // 代充值校验接口(校验合同号)
	'SubmitProxyRecharge':baseUrl+ 'proxyrecharge/submitProxyRecharge', //提交充值
	'GetBank':baseUrl + 'common/getDictionariesByType?type=proxy_recharge_bank', //查询所有银行
	'getDictionariesByType':baseUrl+ 'common/getDictionariesByType?type=proxy_recharge_status', // 获取充值状态
	'exportRechargeManageRecord':baseUrl+ 'proxyrecharge/exportRechargeManageRecord', //导出

	/*信函管理*/
	//-----------信函管理
	"letterManagementList": baseUrl + "letterManagement/list", // 信函管理数据查询
	"singleDownLoadPDF": baseUrl + "letterManagement/singleDownLoadPDF", //下载
	"letterManagementExport": baseUrl + "letterManagement/export", //模板下载
	"batchBeginCheck": baseUrl + "letterReview/batchBeginCheck", //批量申请
	"batchDownloadLetterFile":baseUrl+ "/letterManagement/batchDownloadLetterFile", //批量下载

	/*报表管理*/
	//------------当日监控
	"selectMonitoringRecord": baseUrl + "business/selectMonitoringRecord", //默认查询
	'selectMonitoringRecordCount':baseUrl+'business/selectMonitoringRecordCount', //当日监控总条数
	"exportMonitoringRecord": baseUrl + "business/exportMonitoringRecord", //当日监控导出
	//------------报表相关接口（公用
	'electReportQuery': baseUrl + 'report/queryData', //默认查询
	'electReport': baseUrl + 'report/electricReportPage', //查询部门
	'getReportTeamList': baseUrl + 'report/getTeamInfo', //查询团队
	'getReportGroupList': baseUrl + 'report/getGroupInfo', //查询组长
	'electFileType': baseUrl + 'report/getReortFileType',// 导出
	'reportDownload': baseUrl + 'report/download', //报表 ----下载
	'reportServiceLine': baseUrl + 'report/productDailyReportPage', //报表 ----产品线

	//------------签入签出清单
	'qnSignInOutStatist': baseUrl + 'qingniu/signInAndOutStatistics', //青牛 -- 签入签出--列表查询
	'qnSignInOutStatistExport': baseUrl + 'qingniu/exportSignInAndOutStatistics', //青牛 -- 签入签出--列表查询

	//------------通话服务统计
	'qnCallServiceList': baseUrl + 'qingniu/selectSessionDetailList',//默认查询
	'qnExportCallServiceList': baseUrl + 'qingniu/exportSessionDetailList',//导出
	/*详情界面*/
	"operateButtonStatus": baseUrl + "case/operateButtonStatus", //按钮组按钮状态
	//------------重要信息
	"getClientInformation": baseUrl + "case/getClientInformation", //客户信息
	"getImportantInformation": baseUrl + "case/getImportantInformation", //借款信息
	"getOverdueCasebByLoanContractNo": baseUrl + "case/getOverdueCasebByLoanContractNo", //逾期信息
	//------------贷款信息
	"getLoanInformation": baseUrl + "case/getLoanInformation", //贷款信息查询接口
	//------------催收记录
	"getUrgeRecord": baseUrl + "case/getUrgeRecord", //催收记录
	//------------资料影像
	"getDataImage": baseUrl + "case/getDataImage", //资料影像
	"getDataImageCount": baseUrl + "case/getDataImageCount", //资料影像数据总条数
	//------------通知记录
	"getNoticeRecord": baseUrl + "case/getNoticeRecord", //通知记录
	//------------分案记录
	"getDivisionRecord": baseUrl + "case/getDivisionRecord", //分案记录
	//------------案件详情
	"getCaseInfoDetail": baseUrl + "case/getCaseInfoDetail", //案件信息
	"getRepayInfoList": baseUrl + "case/getRepayInfoList", //偿清计划
	"getReserverRecordList": baseUrl + "case/getReserverRecordList", //交易历史
	//------------关联案件
	"getRelationCase": baseUrl + "case/getRelationCase", //关联案件
	//------------联系人信息
	"getContactInformation": baseUrl + "case/contact/getContactInformation", //联系人信息
	"getContactInfoCfg": baseUrl + "case/contact/getContactInfoCfg", // 新增联系人（查询关系
	"saveContactInfo": baseUrl + "case/contact/saveContactInfo", //新增联系人
	"delContactInfo": baseUrl + "case/contact/delContactInfo", // 详情页面 删除联系人
	//------------app通讯录
	"getAppMailList": baseUrl + "case/contact/getAppMailList", //APP通讯录
	//------------app通话记录
	"getAppCallRecord": baseUrl + "case/contact/getAppCallRecord", //APP通话记录
	//------------电商收货地址
	"etECommerce":baseUrl+"case/contact/getECommerce", //电商收货地址默认查询
	//------------运营商通话记录
	"getOperatorCallRecord":baseUrl+"case/contact/getOperatorCallRecord", //运营商通话记录
	//------------三方信修
	"getThreeLetter": baseUrl + "case/contact/getThreeLetter", //案件详情-三方信修
	"thirdCall": baseUrl + "bcmpBreasy/getEncryptPhone", // 三方信修 --- 外呼
	//------------信修
	'transferData': baseUrl + 'bcmpBreasy/transferData', //案件详情--百融信修流转接口
	//------------提前委外
	"sourcingAdvance": baseUrl + "case/sourcingAdvance", //提前委外
	"RevokeAdvance":baseUrl + 'outSourcingAdvance/revokeAdvance', //撤销提前委外按钮
	//------------停催
	"stopUrgeSQ": baseUrl + "case/stopUrge", //停催申请
	//------------通知方式
	"showShortMsg": baseUrl + "notice/showShortMsg", //通知方式--短信
	"generateMsg": baseUrl + "notice/generateMsg", //通知方式-生成短信内容
	"sendMsg": baseUrl + "notice/sendMsg", //通知方式-点击确定发送短信
	"getDictionariesByTypeLetterTemplate":baseUrl+"common/getDictionariesByType?type=letter_template", //信函模板查询
	'beginCheck': baseUrl + 'letterReview/beginCheck', //案件详情--信函
	"viewTemplate":baseUrl+"letterReview/viewTemplate", //信函 查看图片
	"inform": baseUrl + "case/inform", //案件详情-通知方式
	//------------催收备注
	"saveUrgeRemarks": baseUrl + "case/saveUrgeRemarks", //提交催收备注
	/*----------------四期开始*/
	//---------------客户信息表
	"ClientIdQuery":baseUrl+"clientId/query",//客户信息表
	"ClientIdQueryCount":baseUrl+"clientId/query/count",//客户信息表(数据总量)
	"ClientIdDownLoad":baseUrl+"clientId/downLoad",//导出
	//-------------网银流水匹配
	"flowMatchingFlowMatchList":baseUrl+"flowMatching/flowMatchList", //列表查询
	"flowMatchingFlowMatchListCount":baseUrl+"flowMatching/flowMatchListCount", //数据总条数查询
	"flowMatchingCheckFlowMatching":baseUrl+"flowMatching/checkFlowMatching",// 网银流水匹配校验
	"flowMatchingSubmitFlowMatching":baseUrl+"flowMatching/submitFlowMatching", //提交匹配信息
	"flowMatchingSelectMatchFile":baseUrl+"flowMatching/selectMatchFile", //查询附件信息
	"flowMatchingExport":baseUrl+"flowMatching/exportFlowMatchList", //导出数据
	//------------催收备注明细表,电催案件管理报表
	"reportQueryData":baseUrl+"report/queryData", //默认查询
	"reportDownload":baseUrl+"report/download", //导出
	"reportGetReortFileType":baseUrl+"report/getReortFileType", //检测数据类型

	/*----------------四期结束*/
	/*没用用到*/
	"listOverCase": baseUrl + "mywwcase/listOverCase", //我已完成的案件
	"initCompany": baseUrl + "mywwcase/init", //其他页面list
	"initOutCompany": baseUrl + "outCompany/init", //委外公司list
	"TestingBcmpBreasyExport": baseUrl + "bcmpBreasy/check/export", //导出数据量检测
	'allTeamList': baseUrl + "teamManage/allTeamList", //查询团队下拉列表
	"teamAllList": baseUrl + "distribute/teamAllList", // 默认查询团队配置列表
	"deleteTeam": baseUrl + "distribute/updateTeam", // 分案团队配置-删除团队,状态改为禁用
	"updateTeamDays": baseUrl + "distribute/updateTeamDays", // 新增团队配置
	"allList": baseUrl + "mywwcase/allList", //分案公司列表
	"settleProofExport": baseUrl + "settleProof/export", //结清证明申请 列表导出
	"settleProof/checkImportedData": baseUrl + "settleProof/checkImportedData", //结清证明申请 导入
	"letterslist": baseUrl + "lettersCheck/list", //信函审核
	'comInit': baseUrl + 'company/init', //地址 机构 公司 查询
	"modifyPwdByOldPwd": baseUrl + "modifyPwd/modifyPwdByOldPwd", //修改密码

};
export default u;