<template>
    <div class="recoveryRule">
      <!-- 公共Header类 -->
      <Collapse v-model="value1" class="header-Collapse" @on-change="rotate">
        <Panel name="1">
          <span class="head-commom">{{title}}</span>
          <span class="swith head-commom">
	            		{{zhedie}}<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
	            	</span>
          <div slot="content">
            <!-- 公共form表单类 -->
            <div class="from-item">
              <Form label-position="right" :label-width="110" inline :model="allselect" :rules="ruleValidate" ref="allselect">

                <FormItem class="block-tip" prop="rulename1">
                  <Select size="large" class="prepend" v-model="formIndex">
                    <Option value="0">合同编号</Option>
                    <Option value="1">客户姓名</Option>
                    <Option value="2">证件号码</Option>
                    <Option value="3">联系电话</Option>
                    <Option value="4">是否特权包</Option>
                    <Option value="5">分中心</Option>
                    <Option value="6">还款日</Option>
                    <Option value="7">逾期天数</Option>
                    <Option value="8">案件分配日期</Option>
                    <Option value="9">永久催收员</Option>
                    <Option value="10">逾期等级</Option>
                    <Option value="11">处理状态</Option>
                    <Option value="12">所属团队</Option>
                    <Option value="13">所属组长</Option>
                    <Option value="14">主体</Option>
                    <Option value="15">营业部</Option>

                  </Select>
                  <Input v-if="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
                  <Input v-if="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect.clientNme" size="large"></Input>
                  <Input v-if="formIndex == 2" type="text" placeholder="请输入证件号码！" v-model="allselect.idCard" size="large"></Input>
                  <Input v-if="formIndex == 3" type="text" placeholder="请输入联系电话！" v-model="allselect.loanNamePhone" size="large"></Input>
                  <Select v-if="formIndex == 4" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect.isSpecial" placeholder="请选择是否特权包！" size="large">
                    <Option :value="item.idKey" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex == 5" @on-open-change="getCenterName" v-model="allselect.centerName" placeholder="请选择分中心！" size="large">
                    <Option :key="index" v-for="(item,index) in centerName" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                  <DatePicker v-if="formIndex == 6" v-model="allselect.monthPayDate" @on-change='dateChange' format="yyyy-MM-dd" type="date" :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
                  <Input v-if="formIndex == 7" type="text" placeholder="请输入逾期天数" size="large" v-model="allselect.overdueDay"></Input>
                  <DatePicker v-if="formIndex == 8" @on-change='dateChange1' type="date" placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect.caseAllotTime"></DatePicker>
                  <Input v-if="formIndex == 9" type="text" placeholder="请输入催收员" size="large" v-model="allselect.foreverUlgeNo"></Input>
                  <Select v-if="formIndex == 10" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade" placeholder="请选择逾期等级" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex == 11" v-model="allselect.handleType" placeholder="请选择处理状态！" size="large">
                    <Option v-for="(item,index) in distList.caseTypeList" :value="item.value" :key="index">{{item.lable}}</Option>
                  </Select>
                  <Select v-if="formIndex == 12" v-model="allselect.teamNo" placeholder="请选择所属团队" class="twoSelect" size="large">
                    <Option value="1">电催M1团队</Option>
                    <Option value="2">电催M2团队</Option>
                  </Select>
                  <Input v-if="formIndex == 13" type="text" placeholder="请输入所属组长" size="large" v-model="allselect.headmanId"></Input>
                  <Select v-if="formIndex == 14" @on-open-change="getListDict($event,'mainBody')" v-model="allselect.mainBody" placeholder="请选择" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.idKey">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex == 15" @on-open-change="getorgnoData" v-model="allselect.orgNo" placeholder="请选择！" size="large">
                    <Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                </FormItem>

                <FormItem class="block-tip" prop="rulename1">
                  <Select size="large" class="prepend" v-model="formIndex1">
                    <Option value="1">合同编号</Option>
                    <Option value="0">客户姓名</Option>
                    <Option value="2">证件号码</Option>
                    <Option value="3">联系电话</Option>
                    <Option value="4">是否特权包</Option>
                    <Option value="5">分中心</Option>
                    <Option value="6">还款日</Option>
                    <Option value="7">逾期天数</Option>
                    <Option value="8">案件分配日期</Option>
                    <Option value="9">永久催收员</Option>
                    <Option value="10">逾期等级</Option>
                    <Option value="11">处理状态</Option>
                    <Option value="12">所属团队</Option>
                    <Option value="13">所属组长</Option>
                    <Option value="14">主体</Option>
                    <Option value="15">营业部</Option>

                  </Select>
                  <Input v-if="formIndex1 == 1" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
                  <Input v-if="formIndex1 == 0" type="text" placeholder="请输入客户姓名！" v-model="allselect.clientNme" size="large"></Input>
                  <Input v-if="formIndex1 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect.idCard" size="large"></Input>
                  <Input v-if="formIndex1 == 3" type="text" placeholder="请输入联系电话！" v-model="allselect.loanNamePhone" size="large"></Input>
                  <Select v-if="formIndex1 == 4" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect.isSpecial" placeholder="请选择是否特权包！" size="large">
                    <Option :value="item.idKey" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex1 == 5" @on-open-change="getCenterName" v-model="allselect.centerName" placeholder="请选择分中心！" size="large">
                    <Option :key="index" v-for="(item,index) in centerName" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                  <DatePicker v-if="formIndex1 == 6" v-model="allselect.monthPayDate" @on-change='dateChange' format="yyyy-MM-dd" type="date" :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
                  <Input v-if="formIndex == 7" type="text" placeholder="请输入逾期天数" size="large" v-model="allselect.overdueDay"></Input>
                  <DatePicker v-if="formIndex1 == 8" @on-change='dateChange1' type="date" placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect.caseAllotTime"></DatePicker>
                  <Input v-if="formIndex1 == 9" type="text" placeholder="请输入催收员" size="large" v-model="allselect.foreverUlgeNo"></Input>
                  <Select v-if="formIndex1 == 10" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade" placeholder="请选择逾期等级" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex1 == 11" v-model="allselect.handleType" placeholder="请选择处理状态！" size="large">
                    <Option v-for="(item,index) in distList.caseTypeList" :value="item.value" :key="index">{{item.lable}}</Option>
                  </Select>
                  <Select v-if="formIndex1 == 12" v-model="allselect.teamNo" placeholder="请选择所属团队" class="twoSelect" size="large">
                    <Option value="1">电催M1团队</Option>
                    <Option value="2">电催M2团队</Option>
                  </Select>
                  <Input v-if="formIndex1 == 13" type="text" placeholder="请输入所属组长" size="large" v-model="allselect.headmanId"></Input>
                  <Select v-if="formIndex1 == 14" @on-open-change="getListDict($event,'mainBody')" v-model="allselect.mainBody" placeholder="请选择" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.idKey">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex1 == 15" @on-open-change="getorgnoData" v-model="allselect.orgNo" placeholder="请选择！" size="large">
                    <Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                </FormItem>
                <FormItem class="block-tip" prop="rulename1">
                  <Select size="large" class="prepend" v-model="formIndex2">
                    <Option value="2">合同编号</Option>
                    <Option value="1">客户姓名</Option>
                    <Option value="0">证件号码</Option>
                    <Option value="3">联系电话</Option>
                    <Option value="4">是否特权包</Option>
                    <Option value="5">分中心</Option>
                    <Option value="6">还款日</Option>
                    <Option value="7">逾期天数</Option>
                    <Option value="8">案件分配日期</Option>
                    <Option value="9">永久催收员</Option>
                    <Option value="10">逾期等级</Option>
                    <Option value="11">处理状态</Option>
                    <Option value="12">所属团队</Option>
                    <Option value="13">所属组长</Option>
                    <Option value="14">主体</Option>
                    <Option value="15">营业部</Option>

                  </Select>
                  <Input v-if="formIndex2 == 2" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
                  <Input v-if="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect.clientNme" size="large"></Input>
                  <Input v-if="formIndex2 == 0" type="text" placeholder="请输入证件号码！" v-model="allselect.idCard" size="large"></Input>
                  <Input v-if="formIndex2 == 3" type="text" placeholder="请输入联系电话！" v-model="allselect.loanNamePhone" size="large"></Input>
                  <Select v-if="formIndex2 == 4" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect.isSpecial" placeholder="请选择是否特权包！" size="large">
                    <Option :value="item.idKey" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex2 == 5" @on-open-change="getCenterName" v-model="allselect.centerName" placeholder="请选择分中心！" size="large">
                    <Option :key="index" v-for="(item,index) in centerName" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                  <DatePicker v-if="formIndex2 == 6" v-model="allselect.monthPayDate" @on-change='dateChange' format="yyyy-MM-dd" type="date" :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
                  <Input v-if="formIndex2 == 7" type="text" placeholder="请输入逾期天数" size="large" v-model="allselect.overdueDay"></Input>
                  <DatePicker v-if="formIndex2 == 8" @on-change='dateChange1' type="date" placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect.caseAllotTime"></DatePicker>
                  <Input v-if="formIndex2 == 9" type="text" placeholder="请输入催收员" size="large" v-model="allselect.foreverUlgeNo"></Input>
                  <Select v-if="formIndex2 == 10" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade" placeholder="请选择逾期等级" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex2 == 11" v-model="allselect.handleType" placeholder="请选择处理状态！" size="large">
                    <Option v-for="(item,index) in distList.caseTypeList" :value="item.value" :key="index">{{item.lable}}</Option>
                  </Select>
                  <Select v-if="formIndex2 == 12" v-model="allselect.teamNo" placeholder="请选择所属团队" class="twoSelect" size="large">
                    <Option value="1">电催M1团队</Option>
                    <Option value="2">电催M2团队</Option>
                  </Select>
                  <Input v-if="formIndex2 == 13" type="text" placeholder="请输入所属组长" size="large" v-model="allselect.headmanId"></Input>
                  <Select v-if="formIndex2 == 14" @on-open-change="getListDict($event,'mainBody')" v-model="allselect.mainBody" placeholder="请选择" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.idKey">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex2 == 15" @on-open-change="getorgnoData" v-model="allselect.orgNo" placeholder="请选择！" size="large">
                    <Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                </FormItem>

                <FormItem class="block-tip" prop="rulename1">
                  <Select size="large" class="prepend" v-model="formIndex3">
                    <Option value="3">合同编号</Option>
                    <Option value="1">客户姓名</Option>
                    <Option value="2">证件号码</Option>
                    <Option value="0">联系电话</Option>
                    <Option value="4">是否特权包</Option>
                    <Option value="5">分中心</Option>
                    <Option value="6">还款日</Option>
                    <Option value="7">逾期天数</Option>
                    <Option value="8">案件分配日期</Option>
                    <Option value="9">永久催收员</Option>
                    <Option value="10">逾期等级</Option>
                    <Option value="11">处理状态</Option>
                    <Option value="12">所属团队</Option>
                    <Option value="13">所属组长</Option>
                    <Option value="14">主体</Option>
                    <Option value="15">营业部</Option>

                  </Select>
                  <Input v-if="formIndex3 == 3" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
                  <Input v-if="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect.clientNme" size="large"></Input>
                  <Input v-if="formIndex3 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect.idCard" size="large"></Input>
                  <Input v-if="formIndex3 == 0" type="text" placeholder="请输入联系电话！" v-model="allselect.loanNamePhone" size="large"></Input>
                  <Select v-if="formIndex3 == 4" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect.isSpecial" placeholder="请选择是否特权包！" size="large">
                    <Option :value="item.idKey" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex3 == 5" @on-open-change="getCenterName" v-model="allselect.centerName" placeholder="请选择分中心！" size="large">
                    <Option :key="index" v-for="(item,index) in centerName" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                  <DatePicker v-if="formIndex3 == 6" v-model="allselect.monthPayDate" @on-change='dateChange' format="yyyy-MM-dd" type="date" :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
                  <Input v-if="formIndex3 == 7" type="text" placeholder="请输入逾期天数" size="large" v-model="allselect.overdueDay"></Input>
                  <DatePicker v-if="formIndex3 == 8" @on-change='dateChange1' type="date" placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect.caseAllotTime"></DatePicker>
                  <Input v-if="formIndex3 == 9" type="text" placeholder="请输入催收员" size="large" v-model="allselect.foreverUlgeNo"></Input>
                  <Select v-if="formIndex3 == 10" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade" placeholder="请选择逾期等级" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex3 == 11" v-model="allselect.handleType" placeholder="请选择处理状态！" size="large">
                    <Option v-for="(item,index) in distList.caseTypeList" :value="item.value" :key="index">{{item.lable}}</Option>
                  </Select>
                  <Select v-if="formIndex3 == 12" v-model="allselect.teamNo" placeholder="请选择所属团队" class="twoSelect" size="large">
                    <Option value="1">电催M1团队</Option>
                    <Option value="2">电催M2团队</Option>
                  </Select>
                  <Input v-if="formIndex3 == 13" type="text" placeholder="请输入所属组长" size="large" v-model="allselect.headmanId"></Input>
                  <Select v-if="formIndex3 == 14" @on-open-change="getListDict($event,'mainBody')" v-model="allselect.mainBody" placeholder="请选择" class="twoSelect" size="large">
                    <Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.idKey">{{item.value}}</Option>
                  </Select>
                  <Select v-if="formIndex3 == 15" @on-open-change="getorgnoData" v-model="allselect.orgNo" placeholder="请选择！" size="large">
                    <Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
                  </Select>
                </FormItem>

                <FormItem style="margin-left: -110px;">
                  <Button type="primary" icon="plus-circled" @click="init()">查询</Button>
                  <Button @click=""><Icon type="navicon-round"></Icon> 导出数据</Button>
                  <Button @click="MyCase_Reset('allselect')"><Icon type="navicon-round"></Icon> 重置</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
</template>

<script>
    export default {
        name: "recoveryRule",
      data(){
          return{
            title:'策略配置',
          }
      }
    }
</script>

<style scoped>

</style>
