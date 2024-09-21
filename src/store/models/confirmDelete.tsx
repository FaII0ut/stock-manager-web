import { action, Action, Thunk, thunk } from "easy-peasy";

export type confirmDeleteModal = {
  show: any;
  resolution: "undecided" | "cancel" | "confirm";
  details: { title: string; description?: string; btnText: any[] ,icon?:any};
  setShow: Action<confirmDeleteModal, any>;
  setResolution: Action<confirmDeleteModal, any>;
  setDetails: Action<confirmDeleteModal, any>;
  clearData: Action<confirmDeleteModal>;
};

const confirmDelete: confirmDeleteModal = {
  show: false,
  resolution: "undecided",
  details: {
    title: "Are you sure you want to delete?",
    description: "This action is irreversable please confirm your action.",
    btnText: ["Cancel", "Delete"],
  },

  setShow: action((state, payload) => {
    state.show = payload;
  }),

  setDetails: action((state, payload) => {
    state.details = payload;
  }),

  setResolution: action((state, payload) => {
    state.resolution = payload;
  }),

  clearData: action((state) => {
    state.details = {
      title: "Are you sure you want to delete?",
      description: "This action is irreversable please confirm your action.",
      btnText: ["Cancel", "Delete"],
    };
  }),
};

export default confirmDelete;
