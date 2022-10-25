import { defineStore } from "pinia";
import { list } from "postcss";

export const useHamburguesaStore = defineStore("hamburguesa", {
  state: () => ({
    list: [],
  }),
  actions: {
    initializeStore(data) {
      if (localStorage.getItem("listado-hamburguesas")) {
        this.list= JSON.parse(localStorage.getItem("listado-hamburguesas"));
      } else {
        this.list = data;
      }
    },
    setList(listado) {
      this.list = listado;
    },
    removeList() {
      this.list = "";
    },
    addItem(data){
      this.list.push(data)
    },
    updateItem(itemId, data){
      this.list = this.list.map((object) => {
        if (object.id === itemId) {
          object = data
        }
        return object
      })
    },
    deleteItem(itemId){
      this.list = this.list.filter((object) => {
        return object.id !== itemId;
      })
    },
  },
});
