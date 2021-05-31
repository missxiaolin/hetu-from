<template>
  <div class="root">
    <div class="main-content">
      <section class="content-body">
        <div class="body-header">
          <h4>计算保本卖出价格</h4>
        </div>
        <div class="pall15 box">
          <div class="buy">
            <div class="item">
              <span>买入价格：</span>
              <el-input-number
                v-model="price"
                :min="0.01"
                :step="0.01"
                :step-strictly="true"
                :max="9999"
                :precision="3"
                controls-position="right"
              ></el-input-number>
            </div>
            <div class="item">
              <span>买入股数：</span>
              <el-input-number
                v-model="number"
                :min="100"
                :max="9999999"
                :step="100"
                :step-strictly="true"
                controls-position="right"
              ></el-input-number>
            </div>
            <div class="item">
              <span>交易佣金：</span>
              <el-input-number
                v-model="commission"
                :min="0"
                :step="0.00001"
                :precision="5"
                :step-strictly="true"
                controls-position="right"
              ></el-input-number>
            </div>
            <div class="num-box">
              <div class="num">买入交易金额：{{ total }}</div>
              <div class="num">买入过户费：{{ transferFee }}</div>
              <div class="num">买入佣金：{{ commissionNum }}</div>
              <div class="num">买入交易费用成本：{{ transactionCost }}</div>
              <div class="num">买入总成本：{{ buyTotal }}</div>
              <div class="num" style="color: red; font-weight: 700">
                卖出需要交易的总金额：{{ sellTotal }}
              </div>
              <div class="num" style="color: red; font-weight: 700">
                需要卖出的价格是：{{ sellPrice }}
              </div>
            </div>
          </div>
          <div>
            <section>
              <div>涨幅价格计算</div>
              <eb-table
                size="medium"
                :columns="columns"
                :data="dataList"
                empty-text="暂无查询结果"
                :showPagination="false"
              >
                <!-- 注释：test - slot - scope -->
                <template #test="scope">{{ scope.row }}</template>
                <!-- 注释：test - 操作 - scope - 一般包含 删除 编辑等 -->
                <template #options="scope">
                  <el-button size="small" type="primary"
                    >操作按钮{{ scope.row }}</el-button
                  >
                </template>
              </eb-table>
            </section>
            <section>
              <div>跌幅价格计算</div>
              <eb-table
                size="medium"
                :columns="columns1"
                :data="dataList1"
                empty-text="暂无查询结果"
                :showPagination="false"
              >
                <!-- 注释：test - slot - scope -->
                <template #test="scope">{{ scope.row }}</template>
                <!-- 注释：test - 操作 - scope - 一般包含 删除 编辑等 -->
                <template #options="scope">
                  <el-button size="small" type="primary"
                    >操作按钮{{ scope.row }}</el-button
                  >
                </template>
              </eb-table>
            </section>
          </div>
        </div>
      </section>
      <section class="content-body mt20">
        <div class="body-header">
          <h4>计算投资收益</h4>
        </div>
        <div class="pall15">
          <div class="eboss-row">
            <div class="eboss-col col-flex"></div>
            <div class="eboss-col col-flex"></div>
          </div>
        </div>
      </section>
      <section class="content-body">
        <div class="body-header">
          <h4>计算做T价格</h4>
        </div>
        <div class="pall15">
          <div class="eboss-row">
            <div class="eboss-col col-flex"></div>
            <div class="eboss-col col-flex"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { add, sub, mul, div } from "../utils/wmath";
export default {
  name: "",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      price: 1, // 买入价格
      number: 100, // 买入股数
      total: 0, // 交易金额
      transferFee: 0, // 过户费
      commission: 0.00025, // 佣金比例
      commissionNum: 0, // 佣金
      transactionCost: 0, // 交易成本
      buyTotal: 0, // 买入成本
      sellTotal: 0, // 卖出需要总价
      sellPrice: 0, // 卖出需要保证的价格
      // 表格表头数据列表,
      columns: [],
      // 表格显示的数据列表,
      dataList: [{}],
      // 表格表头数据列表,
      columns1: [],
      // 表格显示的数据列表,
      dataList1: [{}],
    };
  },
  watch: {
    price: {
      handler(val) {
        if (val) {
          this.computedBuy();
        }
        if (!val && val === 0) {
          this.computedBuy();
        }
      },
      immediate: true,
    },
    number() {
      this.computedBuy();
    },
    commission() {
      this.computedBuy();
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化表头 - 涨幅
      for (let index = 0; index < 10; index++) {
        let item = {};
        if (index === 9) {
          item.label = "涨停";
        } else {
          if (index < 10) {
            item.label = index + 1 + "%";
          }
        }
        item.prop = "prop" + index;
        this.columns.push(item);
      }
      // 初始化表头 - 跌幅
      for (let index = 0; index < 10; index++) {
        let item = {};
        if (index === 9) {
          item.label = "跌停";
        } else {
          if (index < 10) {
            item.label = "-" + (index + 1) + "%";
          }
        }
        item.prop = "prop" + index;
        this.columns1.push(item);
      }
    },
    // 计算所有成本
    computedBuy() {
      // 买入成本
      // 过户费：按成交金额的0.02‰人民币
      // 交易佣金：最低收费5元，最高收费为3‰
      // （股价 * 股数） * 过户费 + （股价 * 股数）* 交易佣金
      let price = Number(this.price);
      if (isNaN(price)) {
        price = 0;
      }
      let number = Number(this.number);
      if (isNaN(number)) {
        number = 0;
      }
      this.total = mul(price, number);
      if (isNaN(this.total)) {
        this.total = 0;
      }
      // 过户费 - 过户费固定费率
      this.transferFee = mul(this.total, 0.00002);
      if (isNaN(this.transferFee)) {
        this.transferFee = 0;
      }
      this.transferFee = this.transferFee.toFixed(3);
      // 佣金
      this.commissionNum = mul(this.total, this.commission);
      if (isNaN(this.commissionNum)) {
        this.commissionNum = 0;
      }
      if (this.commissionNum <= 5) {
        this.commissionNum = 5;
      }
      this.commissionNum = this.commissionNum.toFixed(3);
      // 交易成本
      this.transactionCost = add(this.transferFee, this.commissionNum);
      // 交易总费用
      this.buyTotal = add(
        add(this.total, this.transferFee),
        this.commissionNum
      );
      if (isNaN(this.buyTotal)) {
        this.buyTotal = 0;
      }
      this.buyTotal = this.buyTotal.toFixed(3);
      this.computedSayCont();
      this.computedTableData();
    },
    // 计算保本卖出金额
    computedSayCont() {
      // 多少每股卖出才不赔钱?
      // 可按如下公式计算：（买入总成本+卖出过户费）÷(1-印花税率-交易佣金率)÷股票数量
      // （100302元+2元）÷(1-0.001-0.003)÷10000=10.0706827元
      // 过户费 - 过户费固定费率
      let transferFee = mul(this.buyTotal, 0.00002);
      if (isNaN(transferFee)) {
        transferFee = 0;
      }

      let num1 = add(this.buyTotal, transferFee);
      console.log("num1", num1);
      let num2 = sub(0.999, this.commission);
      console.log("num2", num2);
      let total = div(num1, num2);
      let number = Number(this.number);
      if (isNaN(number)) {
        number = 0;
      }
      this.sellTotal = total;
      let sellPrice = div(total, number);
      if (isNaN(sellPrice)) {
        sellPrice = 0;
      }
      this.sellPrice = sellPrice;
      console.log(
        "卖出需要交易的总金额：",
        total,
        "需要卖出的价格是：",
        sellPrice
      );
    },
    computedTableData() {
      let item = this.dataList[0];
      // this.$set(, 0 , item)
      for (let index = 0; index < 10; index++) {
        let count = mul(this.price, (index + 1) / 100);
        count = add(count, this.price);
        count = count.toFixed(3);
        this.$set(item, "prop" + index, count);
      }
      let item1 = this.dataList1[0];
      // this.$set(, 0 , item)
      for (let index = 0; index < 10; index++) {
        let count = mul(this.price, (index + 1) / 100);
        count = sub(this.price, count);
        count = Number(count);
        count = count.toFixed(3);
        this.$set(item1, "prop" + index, count);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .buy {
    margin-right: 15px;
    .num-box {
      margin-top: 10px;
    }
    .num {
      margin: 3px;
    }
  }
  .item {
    margin: 5px 0;
  }
}
</style>
