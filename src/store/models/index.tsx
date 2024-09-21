import confirmDelete, {confirmDeleteModal} from "./confirmDelete";
import user, {UserModal} from "./user";

export type StoreModel = {
  user: UserModal;
  confirmDelete: confirmDeleteModal;
};

const model: StoreModel = {
  user,
  confirmDelete,
};

export default model;
