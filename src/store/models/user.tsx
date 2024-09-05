import {action, Action, Thunk, thunk} from "easy-peasy";

export type UserModal = {
  user: any;
  sidebarWidth: any;
  token: any;
  setting: any,
  setUser: Action<UserModal, any>;
  setSetting: Action<UserModal, any>;
  setSidebarWidth: Action<UserModal, any>;
  setToken: Action<UserModal, any>;
};

const user: UserModal = {
  user: null,
  token: null,
  sidebarWidth: 71,
  setting: null,

  setUser: action((state, payload) => {
    state.user = payload;
  }),

  setSetting: action((state, payload) => {
    state.setting = payload;
  }),

  setSidebarWidth: action((state, payload) => {
    state.sidebarWidth = payload;
  }),

  setToken: action((state, payload) => {
    try {
      localStorage.setItem("token", payload);
      state.token = payload;
    } catch (e) {
      // console.log(e);
    }
  }),

};

export default user;
