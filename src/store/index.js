import { createStore } from 'vuex'
import notify from "@/store/modules/Notify"
import system from "@/store/modules/System"

const store = createStore( {
    modules: {
        notify,
        system,
    }
} )

export default store
