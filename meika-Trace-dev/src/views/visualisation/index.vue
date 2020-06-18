<template>
    <div class="visualisation">
      <div class="content">
        <div style="" v-if="userType==='2'">
        公司：<el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.comp_CD"
                  :label="item.comp_Name"
                  :value="item.comp_CD"
                >
                </el-option>
            </el-select>
        </div>
        <div style="margin-top:20px">
          <el-row :gutter="20">
            <el-col :span="12"><Ring :comp_CD="value"/></el-col>
              <el-col :span="12"><LineChart :comp_CD="value" /></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><Count :comp_CD="value"/></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><Consume :comp_CD="value" /></el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ring from './Ring.vue'
import LineChart from './LineChart.vue'
import Consume from './Consume.vue'
import Count from './Count.vue'
import { getAllCompany } from '../../api/dataShow'
import { mapMutations } from 'vuex'
export default {
    name: 'visualisation',
    components: {
        Ring,
        LineChart,
        Count,
        Consume
    },
    data() {
        return {
            options: [],
            value: '',
            userType:""
        }
    },
    created() {
      if(this.$store.state.user.comp_CD!=""){
              this.value = this.$store.state.user.comp_CD
      }else{
         this.userType = this.$store.state.user.user_Type
        getAllCompany().then(res => {
            this.options = res

            this.value = res[0].comp_CD
        })
      }


    },
    methods: {
        // ...mapMutations(['SET_COMP_CD']),
    }
}
</script>

<style lang="scss" scoped>
.visualisation {
    width: 100%;
    margin-top: 20px;
    min-height: 800px;
    overflow-x: auto;
    .content {
        width: 1633px;
        margin: 0 30px;
    }
}
</style>
