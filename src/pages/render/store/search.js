const search = {
    state: {
        searchKey: "",
        ladding: false
    },
    mutations: {
        chageSearchKey: (state, list) => {
            state.searchKey = list.searchKey
            state.ladding = list.ladding
        }
    },
    getters: {}
}
export default search