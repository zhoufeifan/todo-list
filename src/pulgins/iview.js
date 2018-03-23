import {Form,FormItem,Button,Input,Icon} from 'iview';
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
}];
export default {
  install(Vue) {
    components.map(component => Vue.component(component.name, component.item));
  },
};

