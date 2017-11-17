import * as types from '../mutation-types'
import HTTP from '@/common/js/http';
import * as config from  '../../config';

const state = {
    name: '',
    list: []
};

const getters = {
    list(state) {
        return state.list;
    }
};

const actions = {
    async getList (context) {
        const params = {
            url: config.GET_LIST,
            data: {
                a: 1,
                b: 2
            }
        };
        const json = await HTTP.request(params);

        context.commit(types.GET_NAME, 'test');
        context.commit(types.GET_LIST, json.data.list);
    }
};

const mutations = {
    [types.GET_NAME] (state, name) {
        state.name = name;
    },
    [types.GET_LIST] (state, list) {
        state.list = list;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}