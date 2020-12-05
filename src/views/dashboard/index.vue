<template>
  <div class="dashboard-container">
    <div class="bg">
      <img class="logo" src="../../assets/logo.png"/>
      <p class="text1">你身边的物联网检测小帮手</p>
      <p class="text2">基于区块链的物联网众包测试系统</p>
      <el-button round> 立即开始体验</el-button>
    </div>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">传统的众包平台
            <div class="sub-grid-context">基于信用的模式</div>
          </div>
          <p class="content">传统的众包平台中雇主（任务发布者）与工作者（任务接收者）几乎都需要依赖可信的第三方来处理任务派发、交易及任务评估等工作，
            虽然大多数情况下这类系统都运作良好，但是这类系统与传统的金融机构一样受制于“基于信用的模式”，而且中心化服务器会存在单点故障、隐私泄露等问题，
            往往还会产生高昂的手续费。</p>
        </el-col>
        <el-col :span="8"><img style="height: 400px;width: auto;margin-left: 50px" src="../../assets/crowdsourcing.png">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><img style="height: 350px;width: auto;margin-left: 50px" src="../../assets/blockc.png">
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">CrowdIoT
            <div class="sub-grid-context">基于区块链的下一代安全众包系统</div>
          </div>
          <p class="content">CrowdIoT创新性地将物联网设备、众包测试和区块链三者结合，设计了一套合理的分配激励机制，将繁琐复杂的物联网设备测试任务安全地交由专业但分布零散的测试用户,
            从而达到减少测试成本，增加了检测效率的目的，解决了物联网设备测试漫长的问题。</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">去中心化
<!--            <div class="sub-grid-context">基于区块链的下一代安全众包系统</div>-->
          </div>
          <p class="content">CrowdIoT引入了区块链作为底层核心技术，实现了众包平台的去中心化，无需依赖第三方中心化服务器和管理商，
            不存在单点故障问题，系统的安全性由成千上万个分布式的节点共同来维护。除此之外，由于消除了传统的可信第三方的存在，
            传统众包平台的佣金制度也将不再存在于系统中，厂商无需再向平台支付昂贵的佣金，从而为厂商降低测试成本，提高厂商测试的积极性。</p>
        </el-col>
        <el-col :span="8"><img style="height: 300px;width: auto;margin-left: 50px"
                               src="../../assets/discentralization.png"></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><img style="height: 300px;width: auto;margin-left: 50px"
                               src="../../assets/smart-contract.png"></el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">智能合约
<!--            <div class="sub-grid-context">基于区块链的下一代安全众包系统</div>-->
          </div>
          <p class="content">利用智能合约不可篡改、电子数据承诺等特性，CrowdIoT将用户管理、任务的发布、任务的接收、任务的评价、奖励的分配等通过智能合约的形式来自动执行与完成。
            智能合约依托于区块链技术，实现了传统纸质合同依靠法律效力才能解决的信任问题。有了智能合约作为电子合同，工作者无需担心完成任务得不到相应的奖励，任务发布者也无需担心工作者不劳而获。</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">信誉度系统</div>
          <p class="content">为了有效激励测试工作者在系统中接收测试任务，CrowdIoT建立了基于信誉度的管理机制。
            它为每位工作者分配一个初始值为60的信誉值（最大100），并随着工作者的任务完成情况来不断更新，该信誉值体现在接收任务的成功概率上，信誉值越大，则工作者接收任务的几率更大。</p>
        </el-col>
        <el-col :span="8"><img style="height: 250px;width: auto;margin-left: 50px" src="../../assets/system.png">
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div class="cr">Copyright © 2020 CrowdIoT All Rights Reserved.</div>
    </el-footer>
    <el-dialog
      title="提示"
      :visible="dialog"
      width="30%">
      <span>是否去完善用户信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="gotoUserInfo">确 定</el-button>
        </span>
    </el-dialog>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

const lineChartData = {
  postedTask: {
    // expectedData: [0, 0, 0, 1, 2, 3, 3],
    expectedData: [0, 0, 0, 0, 0, 0, 0]
    // actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  receivedTask: {
    // expectedData: [0, 0, 0, 1, 1, 1, 1],
    expectedData: [0, 0, 0, 0, 0, 0, 0]
    // actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  reputation: {
    expectedData: [70, 70, 70, 70, 70, 70, 70]
    // actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  reward: {
    // expectedData: [0, 0, 0, 0, 0, 30, 30],
    expectedData: [0, 0, 0, 0, 0, 0, 0]
    // actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      dialog: false,
      legendName: ['PostedTask'],
      lineChartData: lineChartData.newTransaction
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
      this.legendName[0] = type
    },
    gotoUserInfo() {
      this.dialog = false
      this.$router.push({ path: '/setting/setting' })
    }
  },
  created() {
    this.handleSetLineChartData('postedTask')
  },
  mounted() {
    if (this.$route.query.type === 'register') {
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin-top: -10px;
  //height: 3000px;
  .el-main {
    margin-top: 0px;
    margin-left: 350px;
    margin-right: 350px;

    .el-row {
      margin-top: 200px;
    }

    .grid-content {
      font-size: 60px;
      font-weight: bold;
    }

    .sub-grid-context {
      float: right;
      font-weight: bold;
      font-size: 20px;
      margin-top: 35px;
      margin-right: 270px;
    }

    .content {
      font-size: 25px;
      margin-right: 50px;
    }
  }

  .bg {
    /* The image used */
    background-image: url("../../assets/pic1.png");

    /* Full height */
    height: 1017px;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .el-button {
      background-color: transparent;
      border-color: white;
      color: white;
      margin-left: 950px;
    }

    .el-button:hover {
      background-color: transparent;
      border-color: white;
      color: white;
      margin-left: 950px;
      box-shadow: 2px 2px 2px #888888;
    }

    .logo {
      height: 400px;
      width: auto;
      margin-top: 100px;
      margin-left: 650px;
    }

    .text1 {
      margin-top: -40px;
      margin-left: 60%;
      font-size: 20px;
      font-family: "Microsoft JhengHei", serif;
      color: white;
      text-shadow: #2b2f3a;
    }

    .text2 {
      margin-top: -20px;
      text-align: center;
      font-size: 80px;
      font-family: "Microsoft YaHei", serif;
      color: white;
      text-shadow: #2b2f3a;
    }
  }
  .el-footer{
    margin-top: 200px;
    background-color: #2f2c2c;
    padding: 28px 0;
    .cr{
      text-align: center;
      color: white;
    }
  }
}
</style>
