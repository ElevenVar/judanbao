<template>
  <div class="detail">
    <div class="detail-table">
      <div class="wrap-title">
        <span class="line">&nbsp;</span>
        <span class="tit">身份信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">姓名</Col>
          <Col class="com"  span="4">{{clientINFO.clientName}}</Col>
          <Col class="com"  span="2">性别</Col>
          <Col class="com"  span="4">{{clientINFO.clientSex}}</Col>
          <Col class="com"  span="2">证件类型</Col>
          <Col class="com"  span="4">{{clientINFO.certType}}</Col>
          <Col class="com"  span="2">证件号码</Col>
          <Col class="com"  span="4">{{clientINFO.idCard}}</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">有效日期</Col>
          <Col class="com"  span="4">{{clientINFO.expDate}}</Col>
          <Col class="com"  span="2">发证机关</Col>
          <Col class="com"  span="4">{{clientINFO.certIssuOrg}}</Col>
          <Col class="com"  span="2">户籍类型</Col>
          <Col class="com"  span="4">{{clientINFO.regType}}</Col>
          <Col class="com"  span="2">民族</Col>
          <Col class="com"  span="4">{{clientINFO.clientNation}}</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">申请人联系方式</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">手机号码</Col>
          <Col class="com"  span="4">{{clientINFO.clientPhoneOne}}</Col>
          <Col class="com"  span="2">手机使用年限</Col>
          <Col class="com"  span="4">{{clientINFO.mobileTimeSpan}}</Col>
          <Col class="com"  span="2">每月平均消费话费</Col>
          <Col class="com"  span="4">{{clientINFO.mthTelBill}}</Col>
          <Col class="com"  span="2">住宅电话</Col>
          <Col class="com"  span="4">{{clientINFO.nowAddrTel}}</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">住宅电话登记人</Col>
          <Col class="com"  span="4">{{clientINFO.ownerHomePhone}}</Col>
          <Col class="com"  span="2">QQ</Col>
          <Col class="com"  span="4">{{clientINFO.qq}}</Col>
          <Col class="com"  span="2">微信</Col>
          <Col class="com"  span="4">{{clientINFO.weixin}}</Col>
          <Col class="com"  span="2">是否实名登记</Col>
          <Col class="com"  span="4">{{clientINFO.isRealName}}</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">户籍地址</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">省/直辖市</Col>
          <Col class="com"  span="4">{{clientINFO.clientProvince}}</Col>
          <Col class="com"  span="2">市</Col>
          <Col class="com"  span="4">{{clientINFO.clientCity}}</Col>
          <Col class="com"  span="2">区/县</Col>
          <Col class="com"  span="4">{{clientINFO.clientConty}}</Col>
          <Col class="com"  span="2">详细地址</Col>
          <Col class="com"  span="4">{{clientINFO.clientAddr}}</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">居住地址</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">居住地址是否同户籍</Col>
          <Col class="com"  span="4">{{clientINFO.isRegLive}}</Col>
          <Col class="com"  span="2">住房性质</Col>
          <Col class="com"  span="4">{{clientINFO.houseType}}</Col>
          <Col class="com"  span="2">现地址居住时间</Col>
          <Col class="com"  span="4">{{clientINFO.nowAddrYear}}</Col>
          <Col class="com"  span="2">省/直辖市</Col>
          <Col class="com"  span="4">{{clientINFO.nowProvince}}</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">市</Col>
          <Col class="com"  span="4">{{clientINFO.nowCity}}</Col>
          <Col class="com"  span="2">区/县</Col>
          <Col class="com"  span="4">{{clientINFO.nowConty}}</Col>
          <Col class="com"  span="2">详细地址</Col>
          <Col class="com"  span="4">{{clientINFO.nowAddr}}</Col>
          <Col class="com"  span="2">月租金</Col>
          <Col class="com"  span="4"></Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">家庭信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">婚姻状况</Col>
          <Col class="com"  span="4">{{familyInfoDto.maritalStatus}}</Col>
          <Col class="com"  span="2">配偶姓名</Col>
          <Col class="com"  span="4">{{familyInfoDto.spouseName}}</Col>
          <Col class="com"  span="2">配偶电话</Col>
          <Col class="com"  span="4">{{familyInfoDto.spouseTel}}</Col>
          <Col class="com"  span="2">家庭成员姓名</Col>
          <Col class="com"  span="4">{{familyInfoDto.spouseName}}</Col>
        </Row>
<!--        <Row class="detail-table-row">
          <Col class="com"  span="2">关系</Col>
          <Col class="com"  span="4"></Col>
          <Col class="com"  span="2">联系电话</Col>
          <Col class="com"  span="4"></Col>
          <Col class="com"  span="2">家庭成员居住地址是否同户籍</Col>
          <Col class="com"  span="4"></Col>
          <Col class="com"  span="2">家庭地址</Col>
          <Col class="com"  span="4"></Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">家庭成员是否知晓</Col>
          <Col class="com"  span="4">否</Col>
          <Col class="com"  span="2"></Col>
          <Col class="com"  span="4"></Col>
          <Col class="com"  span="2"></Col>
          <Col class="com"  span="4"></Col>
          <Col class="com"  span="2"></Col>
          <Col class="com"  span="4"></Col>
        </Row> -->
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">其他联系人信息</span>
      </div>
      <div class="detail-table-wrap" style='border:0;'>
				<div slot="content" class="table-item">
					<Table border :columns="OtherInfo" :data="OtherInfoData"></Table>
				</div>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">工作信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">客户类型</Col>
          <Col class="com"  span="4">{{clientINFO.clientType}}</Col>
          <Col class="com"  span="2">单位名称</Col>
          <Col class="com"  span="4">{{workINFO.companyName}}</Col>
          <Col class="com"  span="2">所属行业</Col>
          <Col class="com"  span="4">{{workINFO.industry}}</Col>
          <Col class="com"  span="2">单位电话</Col>
          <Col class="com"  span="4">{{workINFO.companyTel}}</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">单位规模</Col>
          <Col class="com"  span="4">{{workINFO.companyCount}}</Col>
          <Col class="com"  span="2">单位性质</Col>
          <Col class="com"  span="4">{{workINFO.companyType}}</Col>
          <Col class="com"  span="2">任职部门</Col>
          <Col class="com"  span="4">department</Col>
          <Col class="com"  span="2">职位</Col>
          <Col class="com"  span="4">{{clientINFO.occupation}}</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">现单位工作时间（月）</Col>
          <Col class="com"  span="4">{{workINFO.workYear}}</Col>
          <Col class="com"  span="2">联系人</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">联系人电话</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">联系人职位</Col>
          <Col class="com"  span="4">无</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">省/直辖市</Col>
          <Col class="com"  span="4">{{workINFO.companyProvince}}</Col>
          <Col class="com"  span="2">市</Col>
          <Col class="com"  span="4">{{workINFO.companyCity}}</Col>
          <Col class="com"  span="2">区/县</Col>
          <Col class="com"  span="4">{{workINFO.companyCounty}}</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">其他信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">个人月收入</Col>
          <Col class="com"  span="4">{{workINFO.monthWage}}</Col>
          <Col class="com"  span="2">电子邮箱</Col>
          <Col class="com"  span="4">{{clientINFO.email}}</Col>
          <Col class="com"  span="2">受教育程度</Col>
          <Col class="com"  span="4">{{clientINFO.educationType}}</Col>
          <Col class="com"  span="2">是否办理过类似分期业务</Col>
          <Col class="com"  span="4">无</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">月还款项</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">备用手机号</Col>
          <Col class="com"  span="4">{{clientINFO.clientPhoneTwo}}</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">商品信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">商品类型</Col>
					<!-- {{productInfo.merType}} -->
          <Col class="com"  span="4"></Col>
          <Col class="com"  span="2">商品品牌</Col>
          <Col class="com"  span="4">{{productInfo.merName}}</Col>
          <Col class="com"  span="2">商品型号</Col>
          <Col class="com"  span="4">无</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">贷款信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">商品总价</Col>
          <Col class="com"  span="4">{{productInfo.totalAmt}}</Col>
          <Col class="com"  span="2">首付金额</Col>
          <Col class="com"  span="4">{{loanInfo.duetoCain}}</Col>
          <Col class="com"  span="2">贷款金额</Col>
          <Col class="com"  span="4">{{loanInfo.loanAmount}}</Col>
          <Col class="com"  span="2">代收手续费</Col>
          <Col class="com"  span="4">0</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">首次还款日</Col>
          <Col class="com"  span="4">{{loanInfo.grantLoanDate}}</Col>
          <Col class="com"  span="2">首次还款项</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">每月还款日</Col>
          <Col class="com"  span="4">{{loanInfo.monthPayDate}}</Col>
          <Col class="com"  span="2">月还款金额</Col>
          <Col class="com"  span="4">{{loanInfo.monthRtnAmount}}</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">分期期数</Col>
          <Col class="com"  span="4">{{loanInfo.loanBill}}</Col>
          <Col class="com"  span="2">是否保险</Col>
          <Col class="com"  span="4">{{loanInfo.isPlatformSettle}}</Col>
          <Col class="com"  span="2">是否购买还款特权包</Col>
          <Col class="com"  span="4">{{loanInfo.isSpecial}}</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">还款账户信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">客户个人账户</Col>
          <Col class="com"  span="6">{{clientINFO.repayAccountNo}}</Col>
          <Col class="com"  span="2">户名（限本人）</Col>
          <Col class="com"  span="6">{{clientINFO.clientName}}</Col>
          <Col class="com"  span="2">开户行</Col>
          <Col class="com"  span="6">{{clientINFO.repayOpenBank}}</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">销售信息</span>
      </div>
      <div class="detail-table-wrap">
        <Row class="detail-table-row">
          <Col class="com"  span="2">商户代码</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">商户名称</Col>
          <Col class="com"  span="4">{{bcmpMerchantInfo.merName}}</Col>
          <Col class="com"  span="2">商户地址</Col>
          <Col class="com"  span="4">{{bcmpMerchantInfo.merAddr}}</Col>
          <Col class="com"  span="2">门店代码</Col>
          <Col class="com"  span="4">无</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">门店名称</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">门店地址</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">门店联系人</Col>
          <Col class="com"  span="4">{{bcmpMerchantInfo.principalName}}</Col>
          <Col class="com"  span="2">门店联系人电话</Col>
          <Col class="com"  span="4">{{bcmpMerchantInfo.principalPhone}}</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">销售姓名</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">销售电话</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">产品名称</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">渠道名称</Col>
          <Col class="com"  span="4">无</Col>
        </Row>
        <Row class="detail-table-row">
          <Col class="com"  span="2">活动代码</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">销售编码</Col>
          <Col class="com"  span="4">无</Col>
          <Col class="com"  span="2">档案代码</Col>
          <Col class="com"  span="4">无</Col>
        </Row>
      </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">备注信息</span>
      </div>
      <Row>
        <input type="textarea" class="beizhu-info"/>
      </Row>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">审核信息</span>
      </div>
      <div class="table-item">
        <Table border :columns="columns1" :data="data1"></Table>
      </div>

    </div>
  </div>

</template>

<script>
  import store from '../../../../store/index'
  export default {
    props: ['loanINFO'],
    data(){
      return {
				OtherInfo:[
					{
						title: '联系人姓名',
						minWidth: 100,
						key: 'belongOrgNo',
					},
					{
						title: '关系',
						minWidth: 100,
						key: 'belongOrgNo',
					},
					{
						title: '电话号码',
						minWidth: 100,
						key: 'belongOrgNo',
					}
				],
        columns1:[
          {
            title: '序号',
            minWidth: 100,
            key: 'belongOrgNo',
          },
          {
            title: '审批节点',
            minWidth: 100,
            key: 'belongOrgNo',
          },
          {
            title: '审核人',
            minWidth: 100,
            key: 'belongOrgNo',
          },
          {
            title: '接受时间',
            minWidth: 100,
            key: 'belongOrgNo',
          },
          {
            title: '处理时间',
            minWidth: 100,
            key: 'belongOrgNo',
          },
          {
            title: '处理结果',
            minWidth: 100,
            key: 'belongOrgNo',
          },
          {
            title: '处理意见',
            minWidth: 100,
            key: 'belongOrgNo',
          },
        ],
        data1:[],
				OtherInfoData:[], //其他联系人信息
        clientINFO:{},
        workINFO:{}, // 工作信息
        contactInfoList:{},
        loanInfo:{}, //贷款信息
        productInfo:{}, // 商品信息（产品信息
				bcmpMerchantInfo:{}, // 销售信息
				familyInfoDto:{}, //家庭信息
				commodity: {}, // 商品信息
				
      }
    },
    watch:{
	    	loanINFO:{
     			handler(newName, oldName) {
			     	if(newName){
							// 客户信息 this.clientINFO=newName.clientInfo
							for(let i in newName.clientInfo){
								if(newName.clientInfo[i] == null || newName.clientInfo[i] ==''){
									this.$set(this.clientINFO, i , '无')
								}else{
									this.$set(this.clientINFO, i , newName.clientInfo[i])
								}
							}
							// 工作信息 this.workINFO=newName.bcmpClientWorkInfo //工作信息
							for(let i in newName.bcmpClientWorkInfo){
								if(newName.bcmpClientWorkInfo[i] == null || newName.bcmpClientWorkInfo[i] == ''){
									this.$set(this.workINFO, i , '无')
								}else{
									this.$set(this.workINFO, i , newName.bcmpClientWorkInfo[i])
								}
							}
		    			// 贷款信息 this.loanInfo=newName.loanInfo
							for(let i in newName.loanInfo){
								if(newName.loanInfo[i] == null || newName.loanInfo[i] ==''){
									this.$set(this.loanInfo , i ,'无')
								}else {
									this.$set(this.loanInfo , i , newName.loanInfo[i])
								}
							}
							// 销售信息
							for(let i in newName.bcmpMerchantInfo){
								if(newName.bcmpMerchantInfo[i] == null || newName.bcmpMerchantInfo[i] == ''){
									this.$set(this.bcmpMerchantInfo , i , '无')
								}else {
									this.$set(this.bcmpMerchantInfo , i , newName.bcmpMerchantInfo[i])
								}
							}
		    			this.contactInfoList=newName.contactInfoList
		    			// 产品信息 this.productInfo=newName.productInfo
							for(let i in newName.productInfo){
								if(newName.productInfo[i] ==null || newName.productInfo[i] ==''){
									this.$set(this.productInfo , i , '无')
								}else {
									this.$set(this.productInfo, i , newName.productInfo[i])
								}
							}
							//家庭信息 this.familyInfoDto = newName.familyInfoDto.maritalStatus	
							for(let i in newName.familyInfoDto.maritalStatus){
								if(newName.familyInfoDto.maritalStatus[i] == null || newName.familyInfoDto.maritalStatus[i] == ''){
									this.$set(this.familyInfoDto , i , '无')
								}else {
									this.$set(this.familyInfoDto , i , newName.familyInfoDto.maritalStatus[i])
								}
							}
							// 其他联系人信息
							this.OtherInfoData = newName.familyInfoDto.familys
		    		}
			    },
			    deep:true 
	     	}
    },
    methods:{
    }
  }
</script>

<style lang="less">
.beizhu-info{
  width: 100%;
  height: 40px;
  border: 1px solid #e8e8e8;
}
</style>
