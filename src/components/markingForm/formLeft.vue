<template>
  <el-aside class="el-list bd">
    <div>
      <h1 class="tplLabel">{{ tempKey.label }}</h1>
    </div>
    <template v-for="(item, index) in temElList[tempKey.value]">
      <div :key="index">
        <span class="title">{{ item.label }}</span>
        <vuedraggable
          tag="ul"
          :list="item.list"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="false"
          :ghostClass="'ghost'"
        >
          <li
            class="form-edit-label"
            v-for="(itm, index) in item.list"
            :key="index"
          >
            <a :style="{ textAlign: 'center' }" href="javascript:;">
              {{ itm.label }}</a
            >
          </li>
        </vuedraggable>
      </div>
    </template>
  </el-aside>
</template>

<script>
import vuedraggable from "vuedraggable";
// 组件数据
import { basicList } from "../tool/element/basicList";
import { layoutList } from "../tool/element/layoutList";
import { highList } from "../tool/element/highList";
import { pageList } from "../tool/element/pageList";
import { antBasciList } from "../tool/antDesign/basicList";
export default {
  name: "formLeft",
  components: {
    vuedraggable,
  },
  props: {
    tempKey: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      temElList: {
        e: [
          {
            label: "基础组件",
            list: basicList,
          },
          {
            label: "布局组件",
            list: layoutList,
          },
          {
            label: "高级组件",
            list: highList,
          },
          {
            label: "页面模板",
            list: pageList,
          },
        ],
        h: [],
        react: [
          {
            label: "基础组件",
            list: antBasciList,
          },
        ],
        element: [],
      },
    };
  },
};
</script>

<style scoped lang="scss">
.tplLabel {
  font-weight: 700;
  text-align: center;
  font-size: 24px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0;
}
.el-list {
  width: 100%;
  height: 100vh;
  .title {
    padding: 8px 12px;
    font-weight: 700;
    font-size: 18px;
    display: inline-block;
    width: 145px;
    text-align: center;
  }
  ul {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;
    li {
      font-size: 12px;
      display: block;
      width: 48%;
      line-height: 26px;
      position: relative;
      float: left;
      left: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 1%;
      color: #333;
      border: 1px solid #f4f6fc;
      &:hover {
        color: #409eff;
        border: 1px dashed #409eff;
      }
      a {
        display: block;
        cursor: move;
        background: #f4f6fc;
        border: 1px solid #f4f6fc;
      }
    }
  }
}
</style>