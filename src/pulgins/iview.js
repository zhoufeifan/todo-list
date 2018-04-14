import {Form,FormItem,Button,Input,Icon,DatePicker,Switch,Checkbox,Modal} from 'iview';
const components = [{
  name:"Form",
  item: Form
},{
  name: 'FormItem',
  item: FormItem,
},{
  name: 'Button',
  item: Button
},{
  name: 'Input',
  item: Input
},{
  name: 'Icon',
  item: Icon
},{
  name: 'DatePicker',
  item: DatePicker
},{
  name: 'i-switch',
  item: Switch
},{
  name: 'Checkbox',
  item: Checkbox
},{
  name: 'Modal',
  item: Modal,
}];
console.log(components);
export default {
  install(Vue) {
    components.map(component => Vue.component(component.name, component.item));
  },
};

