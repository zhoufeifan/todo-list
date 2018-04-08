<template>
  <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="userName">
      <Input type="text" v-model="formInline.userName" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem :style="{ textAlign:'right' }">
      <Button :style="{ marginRight: '10px' }" type="primary" @click="handleSubmit('formInline')">Sign In</Button>
      <a href="#" @click="$router.push('/register')">注册</a>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          userName: '',
          password: ''
        },
        ruleInline: {
          userName: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            let data = await this.$request({
              url: "/user/login",
              data: this.formInline
            });

            window.userInfo = data.userInfo;
            this.$Message.success({
              content: "登录成功",
              duration: 1,
              onClose: ()=>{
                this.$router.push({path: '/taskList'});
              }
            });
          } else {
            this.$Message.error('error Input');
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/mixin.scss";
  .login-form{
    width: 30%;
    @include center-position;
  }
</style>
