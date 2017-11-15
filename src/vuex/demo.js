import { GET_LIST, GET_NAME } from "./mutation-types";

export default {
    state: {
        name: '',
        list: []
    },
    mutations: {
        [GET_NAME] (state, name) {
            state.name = name;
        },
        [GET_LIST] (state, list) {
            state.list = list;
        }
    },
    actions: {
        getList (context) {
            context.commit(GET_NAME, 'test');
            context.commit(GET_LIST, []);
        }
    },
    getters: {
        list: state => {
            return state.list;
        }
    }
}