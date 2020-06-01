import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import router from '@/router';
import { Message } from 'element-ui';
const state = {
    token: getToken(),
    name: '',
    avatar: '',
    user_Name: '',
    user_Email: '',
    user_CD: '',
    user_Type: '',
    user_Phone: '',
    comp_CD: '',
    comp_Simp_Name: '',
    comp_Leader: ''
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_USER_EMAIL: (state, user_Email) => {
        state.user_Email = user_Email;
        localStorage.setItem('user_Email', user_Email);
    },
    SET_USER_NAME: (state, user_Name) => {
        state.user_Name = user_Name;
        localStorage.setItem('user_Name', user_Name);
    },
    SET_USER_CD: (state, user_CD) => {
        state.user_CD = user_CD;
        localStorage.setItem('user_CD', user_CD);
    },
    SET_USER_TYPE(state, user_Type) {
        // console.log('SET_USER_TYPE');
        state.user_Type = user_Type;
        localStorage.setItem('user_Type', user_Type);
    },
    SET_USER_PHONE: (state, user_Phone) => {
        state.user_Phone = user_Phone;
        localStorage.setItem('user_Phone', user_Phone);
    },
    SET_COMP_CD: (state, comp_CD) => {
        state.comp_CD = comp_CD;
        localStorage.setItem('comp_CD', comp_CD);
    },
    comp_Simp_Name: (state, comp_Simp_Name) => {
        state.comp_Simp_Name = comp_Simp_Name;
        localStorage.setItem('comp_Simp_Name', comp_Simp_Name);
    },
    comp_Name: (state, comp_Name) => {
        state.comp_Name = comp_Name;
        localStorage.setItem('comp_Name', comp_Name);
    },
    comp_ID: (state, comp_ID) => {
        state.comp_ID = comp_ID;
        localStorage.setItem('comp_ID', comp_ID);
    },
    comp_Leader: (state, comp_Leader) => {
        state.comp_Leader = comp_Leader;
        localStorage.setItem('comp_Leader', comp_Leader);
    }
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { userCd, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ userCd: userCd.trim(), password: password })
                .then((response) => {
                    // resolve(response.code);
                    resolve(response);

                    if (response.code === 1) {
                        Message({
                            message: '登录成功',
                            type: 'success',
                            duration: 2 * 1000,
                            center: true
                        });
                        // this.$notify({
                        //   title: '成功!',
                        //   message: '登录成功!',
                        //   type: 'success'
                        // })
                        commit('SET_TOKEN', response.token);
                        setToken(response.token);
                    } else if (response.code === 0) {
                        Message({
                            // message: error.message,
                            message: '账号不存在',
                            type: 'error',
                            duration: 2 * 1000,
                            center: true
                        });
                    } else if (response.code === 2) {
                        Message({
                            // message: error.message,
                            message: '账号或密码错误',
                            type: 'error',
                            duration: 2 * 1000,
                            center: true
                        });
                    } else if (response.code === 5) {
                        Message({
                            // message: error.message,
                            message: '该账号正在审核中',
                            type: 'error',
                            duration: 2 * 1000,
                            center: true
                        });
                    } else if (response.code === 9) {
                        Message({
                            // message: error.message,
                            message: '当前企业审核未通过,禁止登录!',
                            type: 'error',
                            duration: 2 * 1000,
                            center: true
                        });
                    } else if (response.code === 8) {
                        Message({
                            // message: error.message,
                            message: '该账号正在审核中',
                            type: 'error',
                            duration: 2 * 1000,
                            center: true
                        });
                    } else if (response.code === 3) {
                        Message({
                            // message: error.message,
                            message: '该用户企业不存在',
                            type: 'error',
                            duration: 2 * 1000,
                            center: true
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then((response) => {
                    // console.log('获取用户信息', response);
                    // console.log('state', state)

                    // const { data } = response.userMsg
                    let data = {
                        user_Name: response.userMsg[0].user_Name,
                        user_Email: response.userMsg[0].user_Email,
                        user_Phone: response.userMsg[0].user_Phone,
                        user_CD: response.userMsg[0].user_CD,
                        user_Type: response.userMsg[0].user_Type,
                        comp_CD: response.userMsg[0].comp_CD,
                        comp_Simp_Name: response.userMsg[0].comp_Simp_Name,
                        comp_Name: response.userMsg[0].comp_Name,
                        comp_ID: response.userMsg[0].comp_ID,
                        comp_Leader: response.userMsg[0].comp_Leader
                    };
                    // console.log('getInfo', data)
                    const {
                        name,
                        avatar,
                        user_Name,
                        user_Email,
                        user_Phone,
                        user_CD,
                        user_Type,
                        comp_CD,
                        comp_Simp_Name,
                        comp_Name,
                        comp_ID,
                        comp_Leader
                    } = data;
                    // if (!data) {
                    //   reject('Verification failed, please Login again.')
                    // }

                    commit('SET_NAME', name);
                    commit('SET_AVATAR', avatar);
                    commit('SET_USER_NAME', user_Name);
                    commit('SET_USER_EMAIL', user_Email);
                    commit('SET_USER_PHONE', user_Phone);
                    commit('SET_USER_CD', user_CD);
                    commit('SET_USER_TYPE', user_Type);
                    commit('SET_COMP_CD', comp_CD);
                    commit('comp_Simp_Name', comp_Simp_Name);
                    commit('comp_Name', comp_Name);
                    commit('comp_ID', comp_ID);
                    commit('comp_Leader', comp_Leader);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_NAME', '');
                    commit('SET_AVATAR', '');
                    commit('SET_USER_NAME', '');
                    commit('SET_USER_EMAIL', '');
                    commit('SET_USER_PHONE', '');
                    commit('SET_USER_CD', '');
                    commit('SET_USER_TYPE', '');
                    commit('SET_COMP_CD', '');
                    commit('comp_Simp_Name', '');
                    commit('comp_Name', '');
                    commit('comp_ID', '');
                    commit('comp_Leader', '');
                    router.options.routes = [];

                    removeToken();
                    resetRouter();

                    localStorage.removeItem('user_Name');
                    localStorage.removeItem('user_Email');
                    localStorage.removeItem('user_Phone');
                    localStorage.removeItem('user_CD');
                    localStorage.removeItem('user_Type');
                    localStorage.removeItem('name');
                    localStorage.removeItem('avatar');
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '');
            commit('user_Type', '');
            removeToken();
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
