<template>
  <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="userName">
      <Input type="text" v-model="formInline.userName" placeholder="请输入用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="请输入密码">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem :style="{ textAlign:'right' }">
      <Button :style="{ marginRight: '10px' }" type="primary" @click="handleSubmit('formInline')">登录</Button>
      <a href="#" @click="$router.push('/register')">注册</a>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          userName: 'zhoufeifan',
          password: '123456'
        },
        ruleInline: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码须大于6位', trigger: 'blur' }
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
