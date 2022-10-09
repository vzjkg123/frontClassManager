import {createStore} from "vuex";
import Cookies from 'js-cookie'
import {requestWithToken} from "@/js/request";

const store = createStore({
    state() {
        return {
            UserInfo: {
                id: "null",
                token: "null",
            },
            currentPage: 1,
        }
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        setUserInfo(state, user) {
            state.UserInfo.id = user.id;
            state.UserInfo.token = user.token;
            Cookies.set("id", user.id, {expire: "30d"})
            Cookies.set("token", user.token, {expire: "30d"})
        },
        tryAutoLogin(state) {
            let id = Cookies.get("id");
            let token = Cookies.get("token");
            if (id !== undefined && token !== undefined) {
                requestWithToken("post", "/user/authToken").then(res => {
                    if (res.data.status === 1) {
                        state.UserInfo.id = id;
                        state.UserInfo.token = token;
                        Cookies.set("id", id, {expire: "30d"})
                        Cookies.set("token", token, {expire: "30d"})
                    }
                }).catch(e => console.log(e));
            }
        },
        setCurrentPage(state, num) {
            state.currentPage = num;
        },
        quit(state) {
            state.UserInfo = {
                id: "null",
                token: "null",
            }
            Cookies.remove("id")
            Cookies.remove("token")
        }
    },
    getters: {
        isLogin(state) {
            return state.UserInfo.token !== "null"
        },
    },
    actions: {}
})

export default store;