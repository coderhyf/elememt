<template>
  <div class="address">
    <Header :is-left="true" title="选择收货地址"/>
    <div class="city_search">
      <div class="search">
        <span class="city">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input type="text" v-model="search_value" placeholder="小区/写字楼/学校">
      </div>
      <location :address="address"/>
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
      search_value: ''
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
    searchPlace () {
      const self = this;
      AMap.plugin ('AMap.Geocoder', function () {
        const autoOptions = {
          city: self.city
        };
        const autoComLete = new AMap.Autocomplete (autoOptions);
        autoComplete.search (self.search_val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result);
          self.areaList = result.tips;
        });
      })
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

.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}

.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>