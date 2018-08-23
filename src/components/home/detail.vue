<template>
  <div class="container_100">
    <!--
    <group>
        <cell title="group的使用" value="">
        </cell>
        <cell-form-preview :list="list"></cell-form-preview>
    </group>
    -->
    <alert v-model="show" title="弹窗标题" button-text="OK" :hide-on-blur="true" @on-show="onShow" @on-hide="onHide">
        我是弹窗内容
    </alert>
    <group>
        <cell title="标题" inline-desc="副标题" link="http://wwww.baidu.com" :is-link="false" :is-loading="false" arrow-direction="" disabled>
            <div slot="value" style="width: 100px;" v-if="false">
                <div style="width: 100px; height: 100px; background: red;"></div>
            </div>
        </cell>
        <cell-box is-link>
            内容
        </cell-box>
        <cell-box is-link>
            内容
        </cell-box>
    </group>
    <x-button @click.native="fnShow">submit</x-button>
  </div>
</template>


<script>
import { Group, Cell, Alert, XButton, CellBox } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Alert,
    XButton,
    CellBox
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      show: false,
    }
  },
  mounted () {
      let vm = this;
  },
  methods: {
      onShow () {
          console.log('开启')
      },
      onHide () {
          console.log('关闭')
      },
      fnShow () {
          let vm = this;
          vm.show = true;
      }
  }
}
</script>