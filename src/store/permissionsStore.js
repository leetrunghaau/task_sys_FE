import { create } from "zustand";
import { persist } from "zustand/middleware";

const permissionsStore = create(
    persist(
        (set) => ({
            keys: [], 
            pId: null,
            addAllKeys: (id, newKeys) => set({ keys: newKeys, pId: id }), 
            removeAllKeys: () => set({ keys: [] , pId: null}), 
            setAllKeys: (id, newKeys) => set({ keys: newKeys, pId: id }), 
        }),
        {
            name: "keys-session", 
        }
    )
);

export default permissionsStore;
