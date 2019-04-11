import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //播放状态
    playing:false,
    //是否全屏
    fullScreen:false,
    //播放列表
    playList: [],
    //当前播放第几首歌
    currentIndex:-1,
    //播放模式 顺序 随机 单曲
    mode:0
  },
  getters: {
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playList: state => state.playList,
    currentIndex: state => state.currentIndex,
    mode: state => state.mode,
    //当前播放第几首歌
    currentSong: state => {
      return state.playList[state.currentIndex]
    }
  },
  mutations: {
    changePlaying(state,playing) {
      state.playing = playing
    },
    changeFullScreen(state,fullScreen) {
      state.fullScreen = fullScreen
    },
    changePlayList(state, playList) {
      state.playList = [...playList]
    },
    changeCurrentIndex(state,currentIndex) {
      state.currentIndex = currentIndex
      // console.log(currentIndex)
    },
    changeMode(state,mode) {
      state.mode = mode
    },
  },
  actions: {
    //添加歌曲
    //1,改变播放状态
    //2，把播放器设置为全屏
    //3，添加播放列表
    //4，指定播放那一首
    addPlayer({ commit }, { list, index }) {
      commit('changePlaying', true)
      commit('changeFullScreen', true)
      commit('changePlayList', list)
      commit('changeCurrentIndex', index)
      // console.log(this.state)
    },
    //删除歌曲
    delSong({ commit }, song) {
      for (let i = 0; i < state.playList.length; i++){
        if (playList[i].id = song.id) {
          index = i
        }
      }
      state.playList.splice(index, 1)
      if (state.currentIndex == playList.length) {
        currentIndex --
      }
      commit('changePlaying', true)
      commit('changeCurrentIndex', currentIndex)
      commit('changePlayList', playList)
    },
    //清空播放列表
    clearPlayList({ commit }) {
      commit('changePlaying', false)
      commit('changePlayList', [])
      commit('changeCurrentIndex',-1)
    }
  }
})
