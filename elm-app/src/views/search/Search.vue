<template>
  <div class="search">
    <Header :is-left="true" title="搜索"/>
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="key_word" placeholder="搜索商家/信息"/>
        <button @click.prevent="searchHandle">搜索</button>
      </form>
    </div>
    <div class="shop" v-if="result && !showShop">
      <div class="empty_wrap" v-if="empty">
        <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt>
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <search-index @click="$router.push('/shop')" :data="result.restaurants"/>
        <search-index @click="shopItemClick" :data="result.words"/>
      </div>
    </div>
    <div class="container" v-if="showShop">
      <filter-view :filterData="filterData" @update="update"/>
      <div class="shopList"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading">
        <index-shop v-for="(item , index) in restaurants" :key="index"
                    :restaurant="item.restaurant"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import SearchIndex from "@/components/searchIndex/SearchIndex";
import FilterView from "@/components/filterView/FilterView";
import IndexShop from "@/components/indexShop/IndexShop";

export default {
  name: "Search",
  components: {
    SearchIndex,
    Header,
    FilterView,
    IndexShop
  },
  data () {
    return {
      key_word: '',
      result: null,
      debounceChange: null,
      empty: false,
      showShop: false,
      filterData: null,
      data: null,
      restaurants: [],
      page: 0,
      size: 7,
      loading: false,
    }
  },
  watch: {
    key_word () {
      this.empty = false;
      this.showShop = false;
      this.debounceChange ();
    }
  },
  mounted () {
    this.debounceChange = this.debounce (this.key_word_change, 1000);
  },
  created () {
    // this.debounceChange = this.debounce (this.key_word_change, 1000);
    this.$axios ('/api/profile/filter').then (res => this.filterData = res.data)
  },
  methods: {
    key_word_change () {
      this.$axios (`/api/profile/typeahead/${this.key_word}`)
        .then (res => this.result = res.data).catch (() => this.result = null)
    },
    searchHandle () {
      if (!this.key_word) return;
      if (this.result && (this.result.restaurants.length > 0 || this.result.words > 0)) {
        this.shopItemClick ();
      } else {
        this.empty = true;
      }
    },
    shopItemClick () {
      this.restaurants = [];
      this.page = 0;
      this.showShop = true;
    },
    loadMore(){
      this.page++;
      this.$axios
        .post (`/api/profile/restaurants/${this.page}/${this.size}`, this.data)
        .then (res => {
          if(res.data.length > 0) {
            res.data.forEach(item =>  this.restaurants.push(item))
          } else  {
            this.loading = true;
          }
        });
    },
    update (condition) {
      this.data = condition;
      this.shopItemClick ();
    },
    // 延迟搜索时间,针对搜索商家
    debounce (func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout (timer);
        timer = setTimeout (() => {
          func.apply (this, args);
        }, delay)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.search_header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4.266667vw;
}

.search_header .search_wrap {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}

.search_wrap .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
}

.search_wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}

.search_wrap button {
  outline: none;
  border: none;
  color: #333;
  font-size: 0.426667rem;
  background: #fff;
  font-weight: 700;
  margin-left: 2.933333vw;
}

.shop {
  width: 100%;
  height: calc(100% - 95px);
  overflow: auto;
}

.empty_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}

.empty_wrap img {
  width: 35vw;
  height: 35vw;
}

.empty_txt h4 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}

.empty_txt span {
  color: #999;
  font-size: 0.8rem;
}
</style>