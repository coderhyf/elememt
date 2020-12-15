<template>
  <div class="address">
    <Header :is-left="true" title="选择收货地址"/>
    <div class="city_search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input type="text" v-model="search_value" placeholder="小区/写字楼/学校">
      </div>
      <location @click="seleteAddress" :address="address"/>
    </div>
    <div class="area">
      <ul class="area_list" v-for="(item,index) in cityTips" :key="index">
        <li @click="seleteAddress(item)">
          <h4>{{ item.name }}</h4>
          <p>{{ item.district }}{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../../components/header/Header";
import Location from "../../components/Location/Location";

export default {
  name: "addRess",
  components: {
    Header,
    Location
  },
  data () {
    return {
      city: '', // 当前的城市
      search_value: '',
      cityTips: [],
    }
  },

  computed: {
    address () {
      return this.$store.getters.location.formattedAddress;
    }
  },
  watch: {
    search_value () {
      this.searchPlace ();
    }
  },
  methods: {
    // 高德地图
    searchPlace () {
      const self = this;
      AMap.plugin ('AMap.Autocomplete', function () {
        // 实例化Autocomplete
        const autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        }
        const autoComplete = new AMap.Autocomplete (autoOptions);
        autoComplete.search (self.search_value, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.cityTips = result.tips;
        })
      })
    },
    // 设置地址
    seleteAddress (item) {
      if (item) {
        this.$store.dispatch ('setAddress', item.district + item.address + item.name);
      } else {
        this.$store.dispatch ('setAddress', this.address);
      }

      // 跳转home
      this.$router.push ('/home')
    }
  },
  beforeRouteEnter (to, from, next) {
    next (vm => vm.city = to.params.city)
  }
}
</script>

<style scoped lang="less">
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}

.search .city {
  padding: 0 10px;
}

.city i {
  margin-right: 10px;
}

.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}

ul {
  list-style: none;
}

.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
  height: 30px;
}

.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>