<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.name }"
                                class="22 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{
                                    item.label
                                }}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="md:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">

                <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.name }"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    {{ item.label }}
                </router-link>

            </div>
            <div class="border-t border-gray-700 pt-4 pb-3">
                <div class="flex items-center px-5">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                    </div>
                    <div v-if="auth" class="ml-3">
                        <div class="text-base font-medium leading-none text-white">{{ auth.name }}</div>
                        <div class="text-sm font-medium leading-none text-gray-400">{{ auth.email }}</div>
                    </div>

                </div>
                <div v-if="uN.length > 0" class="mt-3 space-y-1 px-2">
                    <router-link v-for="item in uN" :key="item.name" :to="{ name: item.name }"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        {{ item.auth }} {{ item.label }}
                    </router-link>

                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosurePanel } from '@headlessui/vue'
import { computed, ref, onMounted, watch } from 'vue'
import store from '@/store'

const auth = computed(() => store.getters['user/getUser'])

const user = {
    imageUrl:
        '/user.png',
}

const navigation = [
    { name: 'About', label: 'Обо мне' },
    { name: 'Task', label: 'Задача' },
]

const userNavigation = [
]

const uN = ref([])

const navPreparation = (origin, output) => {

    output.value = []

    origin.map((item, index) => {

        if (auth.value) {

            if (item.reqAuth || (!item.reqAuth && !item.reqGuest)) {
                output.value.push(origin[index])
            }

        } else {

            if (!item.reqAuth || item.reqGuest) {
                output.value.push(origin[index])
            }

        }

    })

}

onMounted(() => {

    navPreparation(userNavigation, uN)

})

watch(auth, () => {

    navPreparation(userNavigation, uN)

})

</script>
