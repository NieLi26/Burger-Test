<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot as="template" :show="isOpenIngredientes">
        <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto" @close="setOpen(false)">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div
                        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div>
                            <div class="items-center flex justify-between">
                                <div class="flex items-center">
                                    <span
                                        class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-200 text-white">
                                        <PlusIcon class="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <p class="text-xl font-bold ml-2 sm:mt-0 sm:ml-3">
                                        Agregar o Eliminar Ingredientes
                                    </p>
                                </div>

                                <button type="button"
                                    class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    @click="setOpen(false)">
                                    <span class="sr-only">Close</span>
                                    <XIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                
                            <button @click="addRow" type="button"
                                class="inline-flex items-center justify-center rounded-md my-5 border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
                                AGREGAR
                                <PlusIcon class="ml-2 h-6 w-6" aria-hidden="true" />
                            </button>

                            <div v-for="item, index of ingredientes" :key="index"
                                class="mb-6 sm:mb-8 sm:flex items-center space-x-2 space-y-2">
                                <div class="mt-2 w-full">
                                    <label for="nombre"
                                        class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                                        <input v-model="item.name" type="text" id="nombre" placeholder="nombre"
                                            class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />

                                        <span
                                            class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                            Ingrediente {{ index+1 }}
                                        </span>
                                    </label>
                                </div>
                                <button @click="deleteRow(index)" type="button"
                                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto">
                                    <XIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button type="button"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                @click="handleAddItem">
                                Guardar
                            </button>
                            <button type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                @click="setOpen(false)" ref="cancelButtonRef">
                                Cancel
                            </button>
                        </div>

                        <!-- Alert -->
                        <div v-if="errors.length"
                            class="mt-5 sm:mt-6 bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-4"
                            role="alert">
                            <p class="font-bold">
                                Error
                            </p>
                            <p v-for="error in errors" :key="error">
                                {{ error }}
                            </p>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon, PlusIcon } from 'vue-tabler-icons';
import { useHamburguesaStore } from '../stores/hamburguesa'

const store = useHamburguesaStore();


watch(() => props.isOpenIngredientes, () => {


    errors.value = []

    formData.id = props.hamburguesa.id
    formData.nombre = props.hamburguesa.nombre
    formData.calorias = props.hamburguesa.calorias

    for (const i of props.hamburguesa.ingredientes) {
        ingredientes.value.push({ 'name': i })
    }



    if (!props.isOpenIngredientes) {
        ingredientes.value = []
    }



})


// pasar valor del padre al hijo - en este caso abrir modal
const props = defineProps({
    isOpenIngredientes: Boolean,
    hamburguesa: Object,
    action: String
})


// pasar valor del hijo al padre - en este caso cerrar el modal
const emit = defineEmits(['toggle']);

const setOpen = (value) => {
    // usamos el emit porque el padre debe hacer el cambio de estado, debemos avisarle del cambio, en este caso a false
    emit('toggle', value);
}


const ingredientes = ref([])

let formData = {
    id: null,
    nombre: '',
    calorias: '',
    ingredientes: []
}


const errors = ref([])

const handleAddItem = () => {

    errors.value = []
    formData.ingredientes = []
    for (const i of ingredientes.value) {
        i.name && formData.ingredientes.push(i.name)
    }

    if (!errors.value.length) {
        try {

            store.updateItem(formData.id, formData)
            localStorage.setItem('listado-hamburguesas', JSON.stringify(store.list))

            setOpen(false);
        } catch (error) {
            console.log(error);
        }


    }
}

const addRow = () => {

    ingredientes.value.push({ 'name': '' })
}

const deleteRow = (index) => {
    ingredientes.value.splice(index, 1)
}

</script>