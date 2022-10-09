<template>
  <Menu mode="horizontal" theme="light" class="ul_style" :active-name="currentPage">
    <div class="layout-logo">1.0 Beta</div>
    <div v-if="true" class="layout-nav">
      <MenuItem name="1" to="/">
        <Icon type="ios-book"/>
        炸鱼区
      </MenuItem>
      <MenuItem name="2" to="/">
        <Icon type="ios-archive"/>
        我的作业
      </MenuItem>
      <MenuItem name="3" to="/class">
        <Icon type="ios-keypad"></Icon>
        我的班级
      </MenuItem>
      <MenuItem name="4" to="/about">
        <Icon type="ios-at-outline"/>
        关于
      </MenuItem>
      <Button type="primary" v-if="!loginStatus" @click="modal=true">登录</Button>
      <Dropdown v-else>
        <a href="javascript:void(0)">
          <Icon type="ios-contact-outline"/>
          我的
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <template #list>
          <DropdownMenu>
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem disabled>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
    </div>
  </Menu>
  <Modal
      :footer-hide=true
      v-model="modal"
      title="登录"
      :loading="loading">
    <div class="demo-login">
      <Login @on-submit="handleSubmit">
        <UserName name="username"/>
        <Password name="password"/>
        <div class="demo-auto-login">
          <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
          <a>忘记密码</a>
        </div>
        <Submit :loading="loading"/>
      </Login>
    </div>
  </Modal>
</template>
<script>


import axios from "axios";

export default {
  name: "MyHead",
  data() {
    return {
      // theme: 'dark',
      modal: false,
      loading: false,
      autoLogin: true,

    }

  },
  methods: {
    handleSubmit(valid, {username, password}) {
      if (valid) {
        this.loading = true;
        let userInfo = new FormData;
        userInfo.append("account", username);
        userInfo.append("password", password);
        axios.post("/user/login", userInfo).then(res => {
          if (res.data.status === 1) {
            this.$store.commit("setUserInfo", {
              id: res.data.data.id,
              token: res.data.data.token,
            })
            this.modal = false
          } else {
            this.loading = false;
            this.$Notice.open({
              title: '登录失败',
              desc: res.data.msg,
            });
          }
        }).catch(e => {
          this.loading = false;
          this.$Notice.open({
            title: '登录失败',
            desc: e,
          });
        })
      }
    },
  },
  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },
    loginStatus() {
      return this.$store.getters.isLogin;
    }
  },
  mounted() {
    this.$store.commit("setCurrentPage", 1);
    this.$store.commit("tryAutoLogin");
  }
}
</script>
<style scoped>
.layout-logo {
  width: 100px;
  height: 30px;
  background: white;
  font-weight: bold;
  font-style: italic;
  font-size: 24px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 530px;
  background: white;
  margin: 0 20px 0 auto;
}

.ul_style {
}

.demo-login {
  width: 400px;
  margin: 0 auto !important;
}

.demo-auto-login {
  margin-bottom: 24px;
  text-align: left;
}

.demo-auto-login a {
  float: right;
}
</style>
