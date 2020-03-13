import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import playList from './playList'
import playing from './playing'
import search from './search'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        state: state,
        playList: playList,
        playing: playing,
        search : search
    }
})
export default store;