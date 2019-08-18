import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import  "./assets/css/reset.css";
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;


import { Button, Select ,Row,
  Col,Form,FormItem,Input,Message ,CheckboxGroup,
  Checkbox,Radio,RadioButton,RadioGroup,Option,
  Container,Header,Aside,Main,Footer,Submenu,
  MenuItemGroup,MenuItem,Menu,Table,TableColumn,Dropdown,
  DropdownMenu,DropdownItem,Dialog
} from 'element-ui';

Vue.use(Button).use(Select).use(Row).use(Col).use(FormItem)
.use(Input).use(Form).use(CheckboxGroup).use(Checkbox).use(Radio)
.use(RadioButton).use(RadioGroup).use(Option).use(Container).use(Aside)
.use(Header).use(Main).use(Footer).use(Submenu).use(MenuItemGroup)
.use(MenuItem).use(Menu).use(Table).use(TableColumn).use(Dropdown)
.use(DropdownMenu).use(DropdownItem).use(Dialog)

Vue.prototype.$message = Message                    

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
