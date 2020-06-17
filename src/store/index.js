import Vue from 'vue';
import Vuex from 'vuex';
// vuex 持久化操作
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

// 动态加载
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
const store = new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    reducer(val) {
      return val.header
    }
  })]
});

export default store;
