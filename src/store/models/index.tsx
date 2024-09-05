import user, {UserModal} from "./user";

export type StoreModel = {
  user: UserModal;
};

const model: StoreModel = {
  user,
};

export default model;
