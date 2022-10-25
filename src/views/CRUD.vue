<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Hamburguesas</h1>
                <p class="mt-2 text-sm text-gray-700">Una lista de todas las hamburguesas incluidos su id, nombre,
                    calorias e ingredientes.</p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-5">
                <button @click="reseteList" type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto">
                    Resetear
                </button>
                <button @click="isOpen = true, action = 'create'" type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                    Agregar
                </button>
            </div>
        </div>
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr class="divide-x divide-gray-200">
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Id #</th>
                                    <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Nombre</th>
                                    <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Calorias</th>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-6">Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="{id, nombre, calorias, ingredientes} in store.list" :key="id"
                                    class="divide-x divide-gray-200">
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ id }}
                                    </td>
                                    <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ nombre }}</td>
                                    <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ calorias }}</td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                                        <div class="flex items-center justify-center sm:-space-x-4 hover:space-x-1">
                                            <button
                                                @click="isOpenIngredientes = true, dataCRUD = {nombre: nombre, calorias: calorias, id: id, ingredientes: ingredientes}"
                                                type="button"
                                                class="z-10 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-yellow-50">
                                                <span class="sr-only">Add Ingredients</span>
                                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>

                                            <button
                                                @click="isOpenInfo = true, dataCRUD = {nombre: nombre, calorias: calorias, id: id, ingredientes: ingredientes}"
                                                type="button"
                                                class="z-10 block rounded-full border-2 border-white bg-green-100 p-4 text-green-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-green-50">
                                                <span class="sr-only">Info</span>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="icon icon-tabler icon-tabler-info-circle h-4 w-4" width="24"
                                                    height="24" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" fill="none" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <circle cx="12" cy="12" r="9"></circle>
                                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                    <polyline points="11 12 12 12 12 16 13 16"></polyline>
                                                </svg>
                                                <!-- <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg> -->
                                            </button>

                                            <button type="button"
                                                @click="isOpen = true, dataCRUD = {nombre: nombre, calorias: calorias, id: id, ingredientes:ingredientes}, action = 'update'"
                                                class="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50">
                                                <span class="sr-only">Edit</span>
                                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>

                                            <button type="button"
                                                @click="isOpenDelete = true, dataCRUD = {nombre: nombre, calorias: calorias, id: id, ingredientes: ingredientes}"
                                                class="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50">
                                                <span class="sr-only">Delete</span>
                                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <template v-if="loading">
                                    <div class="absolute z-50 right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                                        <div class="w-64 h-64 mx-auto border-4 border-dashed rounded-full animate-spin border-black"></div>
                                    </div>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modals -->
    <ModalIngredients :isOpenIngredientes="isOpenIngredientes" :hamburguesa="dataCRUD"
        @toggle="(value) => isOpenIngredientes = value" />

    <ModalInfo :isOpenInfo="isOpenInfo" :hamburguesa="dataCRUD" @toggle="(value) => isOpenInfo = value" />

    <Modal :isOpen="isOpen" :hamburguesa="dataCRUD" :action="action" @toggle="(value) => isOpen = value" />

    <ModalDelete :isOpenDelete="isOpenDelete" :hamburguesa="dataCRUD" @toggle="(value) => isOpenDelete = value" />

</template>
  
<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { useHamburguesaStore } from '../stores/hamburguesa'
import Modal from '../components/Modal.vue'
import ModalDelete from '../components/ModalDelete.vue'
import ModalInfo from '../components/ModalInfo.vue'
import ModalIngredients from '../components/ModalIngredients.vue';

const hamburguesas = ref('')

const store = useHamburguesaStore();

const loading = ref(false)

const cargarHamburguesas = async () => {

    try {
        loading.value = true
        const response = await axios.get('https://prueba-hamburguesas.herokuapp.com/burger/');
        hamburguesas.value = response.data;
        store.initializeStore(hamburguesas.value)
    } catch (error) {
        console.log(error);
    }finally{
        loading.value = false
    }
}

//   setTimeout(()=>{
cargarHamburguesas()
// }, 3000)


const reseteList = () => {
    cargarHamburguesas()
    store.setList(hamburguesas.value)
    localStorage.setItem('listado-hamburguesas', JSON.stringify(hamburguesas.value))
}


// data enviada a modal
const isOpen = ref(false)

const isOpenIngredientes = ref(false)

const isOpenDelete = ref(false)

const isOpenInfo = ref(false)

const action = ref('')

const dataCRUD = ref({
    id: null,
    nombre: '',
    calorias: '',
    ingredientes: []
})


</script>
