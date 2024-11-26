import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [],
    modifyTask: false,
    modifyData: {},
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
        const filterdItem = state.items.filter(item => item.id !== action.payload.id)
        state.items = filterdItem
    },
    modifyItem: (state, action) => {
      const itemToModify = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemToModify) {
        Object.assign(itemToModify, action.payload);
      }
    },
    toggleModal: (state) => {
      state.modifyTask = true;
    },
    getModifyData: (state, action) => {
      state.modifyData = action.payload;
    },
    changeStatus: (state) => {
      state.modifyTask = false;
    },
  },
});

export const { addItem, modifyItem, toggleModal, getModifyData, changeStatus, deleteItem } =
  todoSlice.actions;
export default todoSlice.reducer;
