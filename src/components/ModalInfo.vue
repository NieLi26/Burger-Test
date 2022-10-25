<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot as="template" :show="isOpenInfo">
        <Dialog as="div" class="fixed z-50 inset-0 overflow-y-auto" @close="setOpen(false)">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel
                        class="inline-block p-4 overflow-hidden align-bottom transition-all transform  bg-white rounded-lg shadow-2xl lg:p-8  sm:align-middle sm:max-w-sm sm:w-full">
                        <div>
                            <div class="mt-3  sm:mt-5">
                                <h1 class="mb-8 text-2xl font-extrabold leading-none tracking-tighter text-neutral-600">
                                    Ingredientes
                                </h1>
                            </div>
                        </div>
                        
                        <ul class="">
                            <li v-for="i in props.hamburguesa.ingredientes" :key="i"
                                class="flex text-base text-body-color mb-4">
                                <span class="
                                        rounded-full
                                        mr-2
                                        text-base text-primary
                                        flex
                                        items-center
                                        ">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-check text-green-600" width="24" height="24"
                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M5 12l5 5l10 -10"></path>
                                    </svg>
                                </span>
                                <b class="mr-2">{{ i }}</b>
                            </li>
                        </ul>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot, DialogPanel } from '@headlessui/vue'

// pasar valor del padre al hijo - en este caso abrir modal
const props = defineProps({
    isOpenInfo: Boolean,
    hamburguesa: Object,
})


// pasar valor del hijo al padre - en este caso cerrar el modal
const emit = defineEmits(['toggle']);

const setOpen = (value) => {
    // usamos el emit porque el padre debe hacer el cambio de estado, debemos avisarle del cambio, en este caso a false
    emit('toggle', value);
}



</script>