<template>
  <div :class="{'open': isShow || isScreen}" @click.self="hideView">
    <div class="filter_wrap" v-if="filterData">
      <aside class="filter">
        <div class="filter-nav" v-for="(item,index) in filterData.navTab" :key="index"
             :class="{'fliter-bold' : currentFilter === index}"
             @click="filterSort(index)">
          <span>{{ item.name }}</span>
          <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
        </div>
      </aside>
    </div>
    <!--  排序  -->
    <section class="filter-extend" v-if="isShow">
      <ul>
        <li v-for="(item, index) in filterData.sortBy" :key="index"
            @click="selectSerach(item, index)">
          <span :class="{'selectName' : currentShow === index}">{{ item.name }}</span>
          <i class="fa fa-check" v-show="currentShow === index"></i>
        </li>
      </ul>
    </section>
    <!--  筛选  -->
    <section class="filter-extend" v-if="isScreen">
      <div class="filter-sort">
        <div class="morefilter" v-for="(item ,index) in filterData.screenBy" :key="index">
          <p class="title">{{ item.title }}</p>
          <ul>
            <li v-for="(items ,i) in item.data" :key="i"
                :class="{'selected': items.select}"
                @click="selectScreen(items,item)">
              <img v-if="items.icon" :src="items.icon" alt="">
              <span>{{ items.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="morefilter-btn">
        <span class="morefilter-clear" :class="{'edit': edit}"
              @click="clearFilter">清空</span>
        <span class="morefilter-ok" @click="filterOK">确定</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "FilterView",
  props: {
    filterData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      currentFilter: 0,
      currentShow: 0,
      isShow: false,
      isScreen: false
    }
  },
  methods: {
    filterSort (index) {
      this.currentFilter = index;
      switch (index) {
        case 0 :
          this.isShow = true;
          this.$emit ('searchFixed', true)
          break;
        case 1 :
          this.$emit ('update', {condition: this.filterData.navTab[1].condition});
          this.hideView ();
          break;
        case 2 :
          this.$emit ('update', {condition: this.filterData.navTab[2].condition});
          this.hideView ();
          break;
        case 3 :
          this.isScreen = true;
          this.isShow = false;
          this.$emit ('searchFixed', true)
          break;
        default :
          this.hideView ();
          break;
      }
    },
    hideView () {
      this.isShow = false;
      this.isScreen = false;
      this.$emit ('searchFixed', false)
    },
    selectSerach (item, index) {
      this.currentShow = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.hideView ();
      // 更新选择排序数据
      this.$emit ('update', {condition: item.code})
    },
    selectScreen (items, item) {
      if (item.id !== 'MPI') {
        // 单选
        item.data.forEach (el => {
          el.select = false;
        })
      }
      items.select = !items.select;
    },
    clearFilter () {
      this.filterData.screenBy.forEach (data => {
        data.data.forEach (item => {
          item.select = false;
        })
      })
    },
    filterOK () {
      let mpiStr = '';
      let mpiObj = {
        MPI: '',
        offer: '',
        per: ''
      }
      this.filterData.screenBy.forEach (data => {
        data.data.forEach ((item, index) => {
          if (item.select) {
            // 俩种情况： 单选or双选
            if (data.id !== 'MPI') {
              // 单选
              mpiObj[data.id] = item.code;
            } else {
              // 多选
              mpiStr += item.code + ',';
              mpiObj[data.id] = mpiStr;
            }
          }
        })
      })
      this.$emit ('update', {condition: mpiObj});
      this.hideView();
    },
  },
  computed: {
    edit () {
      let edit = false;
      this.filterData.screenBy.forEach (data => {
        data.data.forEach (item => {
          if (item.select) {
            edit = true;
          }
        })
      })
      return edit;
    }
  }
}
</script>

<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 64px;
  z-index: 10;
}

.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}

.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}

.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 28.533333vw;
}

.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}

.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}

/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}

.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}

.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}

.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}

.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}

.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}

.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}

.morefilter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}

.morefilter-clear {
  color: #ddd;
  background: #fff;
}

.morefilter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}

.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}

.edit {
  color: #333 !important;
}

.fliter-bold {
  font-weight: 600;
  color: #333333;
}
</style>