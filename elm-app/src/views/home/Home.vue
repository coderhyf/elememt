<template>
  <div class="home">
    <div class="header">
      <div class="address_map" @click="$router.push({name: 'addRess',params: {city: city}})">
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>

    </div>
    <div class="search_wrap" :class="{'fixedview': isShow}"
         @click="$router.push('/search')">
      <div class="shop_search">
        <i class="fa fa-search"></i>
        搜索商家
      </div>
    </div>
    <div class="container">
      <!--  轮播    -->
      <mt-swipe :auto="4000" style="height: 100px;">
        <mt-swipe-item v-for="(img,index) in swipeImage" :key="index">
          <img :src="img" alt="" style="width: 100%; height: 100px;">
        </mt-swipe-item>
      </mt-swipe>
      <!--  分类    -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(entry,i) in entries" :key="i" class="entry_wrap">
          <div class="foodentry" v-for="(item ,index) in entry" :key="index">
            <div class="img_wrap">
              <img :src="item.image" alt="">
            </div>
            <span>{{ item.name }}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--  推荐商家  -->
    <div class="shopList-title">推荐商家</div>
    <filter-view :filterData="filterData" @searchFixed="searchFixed" @update="update"/>
    <!--  商家信息  -->
    <mt-loadmore :top-method="loadData"
                 :bottom-method="loadMore"
                 :bottom-all-loaded="allLoaded"
                 :bottomPullText="bottomPullText"
                 ref="loadmore"
                 class="mint-loadmore">
      <div class="shopList">
        <index-shop v-for="(item , index) in restaurants" :key="index"
                    :restaurant="item.restaurant"/>
      </div>
    </mt-loadmore>

  </div>
</template>

<script>
import FilterView from "components/filterView/FilterView";
import IndexShop from "components/indexShop/IndexShop";

export default {
  name: "Home",
  components: {
    FilterView,
    IndexShop
  },
  data () {
    return {
      swipeImage: [],
      entries: [],
      restaurants: [],
      page: 1,
      size: 5,
      filterData: null,
      isShow: false,
      allLoaded: false,
      bottomPullText: '上拉加载更多',
      data: null,
    }
  },
  created () {
    this.getData ();
  },
  methods: {
    getData () {
      this.$axios ('/api/profile/shopping').then (res => {
        this.swipeImage = res.data.swipeImgs
        this.entries = res.data.entries
      });
      this.$axios ('/api/profile/filter').then (res => this.filterData = res.data)
      this.loadData ();
    },
    searchFixed (isShow) {
      this.isShow = isShow;
    },
    update (condition) {
      this.data = condition;
      this.loadData ();
    },
    loadData () {
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多";
      // 拉取商家信息
      this.$axios
        .post (`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then (res => {
          // console.log(res.data);
          this.$refs.loadmore.onTopLoaded ();
          this.restaurants = res.data;
        });
    },
    loadMore () {
      if (!this.allLoaded) {
        this.page++;
        // 拉取商家信息
        this.$axios
          .post (`/api/profile/restaurants/${this.page}/${this.size}`)
          .then (res => {
            //  加载完之后重新渲染
            this.$refs.loadmore.onBottomLoaded ();
            if (res.data.length > 0) {
              res.data.forEach (item => {
                this.restaurants.push (item);
              });
              if (res.data < this.size) {
                this.allLoaded = true;
                this.bottomPullText = "没有更多了哦";
              }
            } else {
              // 数据为空
              this.allLoaded = true;
              this.bottomPullText = "没有更多了哦";
            }
          });
      }
    },
  },
  computed: {
    // 获取定位
    address () {
      return this.$store.getters.address;
    },
    city () {
      return this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
    }
  },

}
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.header, .search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}

.header .address_map {
  color: #fff;
  font-weight: bold;
}

.address_map i {
  margin: 0 3px;
  font-size: 18px;
}

.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.search_wrap .shop_search {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}

.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}

.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}

.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}

.img_wrap img {
  width: 100%;
  height: 100%;
}

.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}

.shopList-title {
  display: flex;
  //align-items: self-start;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}

.shopList-title:after,
.shopList-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}

.shopList-title:before {
  margin-right: 3.466667vw;
}

.shopList-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 666;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>