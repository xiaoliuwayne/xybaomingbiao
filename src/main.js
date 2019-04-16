// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource'

import {
  Container,
  Header,
  Main,
  Select,
  Option,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Button,
  Table,
  TableColumn,
  Input,
  Notification,
  Form,
  FormItem,
  Col,
  DatePicker,
  TimeSelect,
  TimePicker,
  Switch,
  RadioGroup,
  Radio,
} from 'element-ui';

Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Switch);

Vue.prototype.$notify = Notification;

Vue.config.productionTip = false;
// Vue.use(CheckboxButton);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
