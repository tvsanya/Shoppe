import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

interface UseMobileReturn {
    isMobile: Ref<boolean>
}

export const useMobile = (): UseMobileReturn => {
    const isMobile = ref<boolean>(false)

    const checkMobile = () => {
        isMobile.value = window.innerWidth < 768
    }

    onMounted(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkMobile)
    })

    return { isMobile }
}
