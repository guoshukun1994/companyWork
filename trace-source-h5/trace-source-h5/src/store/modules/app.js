
const state = {
    proDetailList: [],
    compDetailList: [],
    codeDetailList: {}
};

const mutations = {
    // 商品信息list
    toProDetail (state, list) {
        console.log('进来了mutation: toProDetail');
        
        state.proDetailList = list;
    },
    // 商品信息list
    toCompDetail (state, list) {
        console.log('进来了mutation: toCompDetail');
        
        state.compDetailList = list;
    },
    // 
    toCodeDetail (state, list) {
        console.log('进来了mutation: toCodeDetail');
        
        state.codeDetailList = list;
    }
};

const actions = {
    
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
