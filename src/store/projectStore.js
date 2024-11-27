import { create } from "zustand";

const useProjectStore = create((set) => ({
  id: null,
  name: null,
  description: null,
  parentId: null,
  public: true,
  active: true,
}));

export default useProjectStore;
