import Vue from 'vue'
import Router from 'vue-router'

/* 页面路由 */
/*登录页面*/
import login from '@/components/login'
import forgetpw from '@/components/forgetpw'

import index from '@/components/home/index'
import home from '@/components/home/home'
import dayMonitoring from '@/components/home/dayMonitoring'
/*催收案件管理*/
import collectCaseMange from '@/components/collectCase/collectCaseMange'

/*权限管理菜单*/
import companyManage from '@/components/authManage/companyManage'
import userManage from '@/components/authManage/userManage'
import roleManage from '@/components/authManage/roleManage'
import organizationManage from '@/components/authManage/organiManage'
import accountManage from '@/components/authManage/accountManage'
import sysNotice from '@/components/authManage/sysNotice'
/*委外案件管理*/
//委外公司管理
import outsideCompanyMange from '@/components/outsideCaseManage/outsideCompanyMange'
//我的委外案件
import myOutsideCase from '@/components/outsideCaseManage/myOutsideCase'
//历史分案记录
import historicalRecords from '@/components/outsideCaseManage/historicalRecords'
//我已完成的案件
import doneOutsideCase from '@/components/outsideCaseManage/doneOutsideCase'

//-----------------------------------------------------------------------
//电催案件管理
import myCase from '@/components/electricCaseManagement/myCase'
//我已完成的案件
import finishCase from '@/components/electricCaseManagement/finishCase'
//停催案件管理
import stopCase from '@/components/stopCaseManage/stopCase'
//提前委外审核
import outboardReview from '@/components/caseReviewManage/outboardReview'
//停催申请审核
import stopPressing from '@/components/caseReviewManage/stopPressing'
//电催案件详情
//import electricalDetail from '@/components/electricCaseManagement/electricalDetail/electricalDetail'
//已完成案件详情
import finishDetail from '@/components/electricCaseManagement/finishDetail/finishDetail'
//已完成案件详情-->重要信息-->逾期信息-->点击合同号，带出详情
import importantInfo from '@/components/electricCaseManagement/finishDetail/importantInfo'
//---------------------------------------------------------------------------
/*策略配置*/
// 团队配置
import divisionRule from '@/components/divisionRule/divisionRule'
// 客服 策略配置
// import KFDivisionRule from '@/components/divisionRule/KFDivisionRule'
// 分案策略配置
import productRules from '@/components/divisionRule/productRules'
//回收策略配置
import recoveryRule from '@/components/divisionRule/recoveryRule'
//专员工期管理
// import CommissionerTimeManagement from '@/components/divisionRule/CommissionerTimeManagement'
/*系统管理*/
// 通知管理
import noticeManagement from '@/components/noticeManagement/noticeManagement'
//审核流配置
import auditFow from '@/components/noticeManagement/auditFow'
/*参数管理*/
// 产品管理
import productManagement from '@/components/productManagement/productManagement'
/*业务查询*/
// 业务查询
import businessQuery from '@/components/businessQuery/businessQuery'

/*报表*/
//电催每日累计回报率报表
import electricDayRate from '@/components/reportTable/electricDayRate'
//产品催收日报
import productCollectDaily from '@/components/reportTable/productCollectDaily'
//销售区域催收日报
import salesareaCollectDaily from '@/components/reportTable/salesareaCollectDaily'
//消分账户结构日志报表
import structureAccountReport from '@/components/reportTable/structureAccountReport'
//电催回报率报表
import electricRate from '@/components/reportTable/electricRate'
//分案明细日志追踪表
import breakdownLog from '@/components/reportTable/breakdownLog'
//签入签出清单
import checkInOutList from '@/components/reportTable/checkInOutList'
//通话服务统计
import callServiceStatis from '@/components/reportTable/qnCallServiceStatistics'
// 客户基础信息报表
// import CustomerBasicInformation from '@/components/reportTable/CustomerBasicInformation'
// 分单催收记录报表
// import FDCollectionRecord from '@/components/reportTable/FDCollectionRecord'
/*百融服务*/
//百融易搜
import thawingEasySearch from '@/components/thawingService/thawingEasySearch'



//划扣管理
import buckleManage from '@/components/thawingService/buckleManage'
// 代充值管理
import Recharge from '@/components/thawingService/Recharge'
/*审    核*/
// 信修审核
import Letter from '@/components/examine/Letter'
//提前结清审核
import Settle from '@/components/examine/Settle'
// 结清证明审核
import Prove from '@/components/examine/Prove'
// 信函管理
import LetterManagement from '@/components/examine/LetterManagement'
// 信函审核
import letterAudits from '@/components/examine/LetterAudits'
/* 结清*/
// 提前结清
import FrontsSet from '@/components/Settles/FrontSettles'
// 结清证明
import ProveSettle from '@/components/Settles/ProveSettle'

// 回收改派
import reclaimReform from '@/components/divisionRule/reclaimReform'
// ---------------------四期需求

import BankingWater from '@/components/fourDemand/BankingWater' //网银流水匹配
import CustomerInformation from '@/components/fourDemand/CustomerInformation' // 客户信息表
import CollectionRemarks from '@/components/fourDemand/CollectionRemarks' // 催收备注明细  
import CollectionCase from '@/components/fourDemand/CollectionCase' // 催收案件管理 报表


export default [{
		path: '/login',
		name: 'login',
		component: login
	},
	{
		path: '/forget',
		name: 'forgetpw',
		component: forgetpw
	},
	{
		path: '/',
		name: 'index',
		component: index,
		children: [{
				path: '/index',
				name: 'home',
				component: home
			},
			{ // 已完成案件详情
				//path: '/finishDetail/:showBtn/:hiddenBtn/:allINFO/:showDelimitBtn',
				path: '/finishDetail',
				name: 'finishDetail',
				component: finishDetail
			},
			{ //催收案件管理
				path: '/collectCaseMange',
				name: 'collectCaseMange',
				component: collectCaseMange,
				meta:{
					keepAlive: true, // 设置页面缓存
				},
			},
			{ //公司管理
				path: '/companyManage',
				name: 'companyManage',
				component: companyManage
			},
			{ //用户管理
				path: '/userManage',
				name: 'userManage',
				component: userManage
			},
			{ //角色管理
				path: '/roleManage',
				name: 'roleManage',
				component: roleManage
			},
			{ //系统通知
				path: '/sysNotice',
				name: 'sysNotice',
				component: sysNotice
			},
			{ //机构管理
				path: '/organizationManage',
				name: 'organizationManage',
				component: organizationManage
			},
			{ //委外公司管理
				path: '/outsideCompanyMange',
				name: 'outsideCompanyMange',
				component: outsideCompanyMange
			},
			{ //我的委外案件
				path: '/myOutsideCase',
				name: 'myOutsideCase',
				component: myOutsideCase,
				meta:{
					keepAlive: true, // 设置页面缓存
				},
			},
			{ //历史分案记录
				path: '/historicalRecords',
				name: 'historicalRecords',
				component: historicalRecords
			},
			{ //我已完成的案件
				path: '/doneOutsideCase',
				name: 'doneOutsideCase',
				component: doneOutsideCase
			},
			{ //电催案件管理
				path: '/myCase',
				name: 'myCase',
				component: myCase
			},
			{ //我已完成的案件--电催
				path: '/finishCase',
				name: 'finishCase',
				component: finishCase
			},
			{ //停催案件管理
				path: '/stopCase',
				name: 'stopCase',
				component: stopCase
			},
			{ //提前委外审核
				path: '/outboardReview',
				name: 'outboardReview',
				component: outboardReview
			},
			{ // 停催申请审核
				path: '/stopPressing',
				name: 'stopPressing',
				component: stopPressing
			},
			{ // 已完成案件详情-->重要信息--逾期信息--根据合同号带出详情
				path: '/importantInfo',
				name: 'importantInfo',
				component: importantInfo
			},
			{ // 策略配置
				path: '/divisionRule',
				name: 'divisionRule',
				component: divisionRule
			},
// 			{// 策略配置（客服
// 				path: 'KFDivisionRule',
// 				name: 'KFDivisionRule',
// 				component: KFDivisionRule,
// 			},
			{ // 案件分配
				path: "/productRules",
				name: 'productRules',
				component: productRules
			},
			{ // 回收策略配置
				path: '/recoveryRule',
				name: 'recoveryRule',
				component: recoveryRule
			},
// 			{ //专员工期管理
// 				path: '/CommissionerTimeManagement',
// 				name: 'CommissionerTimeManagement',
// 				component: CommissionerTimeManagement
// 			},
			{ // 回收改派
				path: '/reclaimReform',
				name: 'reclaimReform',
				component: reclaimReform
			},
			{ // 通知管理
				path: '/noticeManagement',
				name: 'noticeManagement',
				component: noticeManagement
			},
			{ // 产品管理
				path: '/productManagement',
				name: 'productManagement',
				component: productManagement
			},
			{ // 规则查询
				path: '/businessQuery',
				name: 'businessQuery',
				component: businessQuery
			},
			{ // 账号管理
				path: '/accountManage',
				name: 'accountManage',
				component: accountManage
			},
			{ //电催每日累计回报率报表
				path: '/electricDayRate',
				name: 'electricDayRate',
				component: electricDayRate
			},
			{ //产品催收日报
				path: '/productCollectDaily',
				name: 'productCollectDaily',
				component: productCollectDaily
			},
			{ //销售区域催收日报
				path: '/salesareaCollectDaily',
				name: 'salesareaCollectDaily',
				component: salesareaCollectDaily
			},
			{ //消分账户结构日志报表
				path: '/structureAccountReport',
				name: 'structureAccountReport',
				component: structureAccountReport
			},
			{ //电催回报率报表
				path: '/electricRate',
				name: 'electricRate',
				component: electricRate
			},
			{ //分案明细日志追踪表
				path: '/breakdownLog',
				name: 'breakdownLog',
				component: breakdownLog
			},
			{ //签入签出清单
				path: '/checkInOutList',
				name: 'checkInOutList',
				component: checkInOutList
			},
			{ //通话服务统计
				path: '/callServiceStatis',
				name: 'callServiceStatis',
				component: callServiceStatis
			},
			{ //百融易搜
				path: '/thawingEasySearch',
				name: 'thawingEasySearch',
				component: thawingEasySearch
			},
			{ //划扣管理
				path: '/buckleManage',
				name: 'buckleManage',
				component: buckleManage
			},
			{// 代充值管理
				path: '/Recharge',
				name: 'Recharge',
				component: Recharge
			},
			{ //划扣管理
				path: '/dayMonitoring',
				name: 'dayMonitoring',
				component: dayMonitoring
			},
			{ // 信修审核
				path: '/Letter',
				name: 'Letter',
				component: Letter,
			},
			{ // 提前结清审核
				path: '/Settle',
				name: 'Settle',
				component: Settle,
			},
			{ // 结清证明审核
				path: '/Prove',
				name: 'Prove',
				component: Prove,
			},
			{ // 提前结清
				path: '/FrontsSet',
				name: 'FrontsSet',
				component: FrontsSet
			},
			{ // 结清证明
				path: '/ProveSettle',
				name: 'ProveSettle',
				component: ProveSettle
			},
			{ // 审核流配置
				path: '/auditFow',
				name: 'auditFow',
				component: auditFow
			},
      {//信函管理
        path:'/LetterManagement',
        name:'LetterManagement',
        component:LetterManagement
      },
      {//信函审核
        path:'/letterAudits',
        name: 'letterAudits',
        component:letterAudits
      },
      // ----------四期需求部分
      {path: '/BankingWater',name: 'BankingWater',component:BankingWater}, // 网银流水匹配
      {path:'/CustomerInformation',name:'CustomerInformation',component:CustomerInformation}, //客户身份表
      {path:'/CollectionRemarks',name:'CollectionRemarks',component:CollectionRemarks}, //催收备注明细表
      {path:'/CollectionCase',name:'CollectionCase',component:CollectionCase}, //催收案件管理报表
		]
	}
]
