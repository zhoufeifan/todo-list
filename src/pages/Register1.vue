<template>
  <Form ref="formCustom" class="register-form" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="UserName" prop="userName">
      <Input type="text" v-model="formCustom.userName"/>
    </FormItem>
    <FormItem label="E-mail" prop="mail">
      <Input v-model="formCustom.mail" placeholder="Enter your e-mail"/>
    </FormItem>
    <FormItem label="Password" prop="password">
      <Input type="password" v-model="formCustom.password"/>
    </FormItem>
    <FormItem label="Confirm" prop="passwordCheck">
      <Input type="password" v-model="formCustom.passwordCheck"/>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
      <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        }
        else if(value.length<6){
          callback(new Error('The min length is six'));
        }
        else {
          if (this.formCustom.passwordCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwordCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.formCustom.password) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };


      return {
        formCustom: {
          password: '',
          passwordCheck: '',
          userName: '',
          mail: '',
        },
        ruleCustom: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwordCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          userName: [
            { required: true, message: 'User name cannot be empty', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate(async(valid) => {
          if (valid) {
            await this.$request({
              url: "/user/register",
              data: this.formCustom
            });
            this.$Message.success({
              content: "注册成功",
              duration: 1,
              onClose: ()=>{
                this.$router.push({path: '/login'});
              }
            });
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/mixin.scss";
  .register-form{
    width: 30%;
    @include center-position;
  }
</style>
