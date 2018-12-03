import Vue from 'vue'
import {
  Loading,
  Message,
  Card,
  Button,
  Form,
  Input,
} from 'element-ui';

Vue.use(Loading.directive);
Vue.use(Card);
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.prototype.$message = Message;
