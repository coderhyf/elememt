<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="请输入城市名" v-model="city_val">
      </div>
      <a @click="$router.push({name:'addRess',params:{city:city}})">取消</a>
    </div>
    <div v-if="searchList.length === 0">
      <div class="location">
        <location @click="selectCity({name:city})" :address="city"/>
      </div>
      <Alphabet ref="allcity" :city-info="cityInfo" :keys="keys" @selectCity="selectCity"/>
    </div>
    <div class="search_list" v-else>
      <ul>
        <li v-for="(item,index) in searchList" :key="index" @click="selectCity(item)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "../../components/Location/Location";
import Alphabet from "../../components/alphabet/Alphabet";

export default {
  name: "City",
  components: {
    Location,
    Alphabet
  },
  data () {
    return {
      city_val: '',
      cityInfo: null,
      keys: [],
      allCitys: [],
      searchList: [],
    }
  },
  created () {
    this.getCityInfo ();
  },
  methods: {
    getCityInfo () {
      this.$axios ('/api/posts/cities').then (res => {
        this.cityInfo = res.data;
        this.keys = Object.keys (res.data);
        // 移除hotCities
        this.keys.pop ();
        // keys排序
        this.keys.sort ();
        // this.$nextTick (() => {
        //   this.$refs.allcity.initScroll ();
        // });
        // 存储所以key
        this.keys.forEach (key => {
          this.cityInfo[key].forEach (city => {
            this.allCitys.push (city);
          })
        })
      })
    },
    selectCity (city) {
      this.$router.push ({name: 'addRess', params: {city: city.name}})
    },
    serachCity () {
      if (!this.city_val) {
        // 如果搜索框为空，情况数组
        this.searchList = [];
      } else {
        this.searchList = this.allCitys.filter (item => {
          return item.name.indexOf (this.city_val) !== -1;
        })
      }
    }
  },
  watch: {
    city_val () {
      this.serachCity ();
    }
  },
  computed: {
    city () {
      return this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
    }
  },
}
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}

.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}

.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}

.search_wrap a {
  outline: none;
  color: #009eef;
  height: 39px;
  line-height: 39px;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: aorder-aox;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}

ul {
  list-style: none;
}
.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>