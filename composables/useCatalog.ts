import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'

interface CatalogItem {
    id: number
    title: string
    price: number
    image: string
}

export const useCatalogApi = () => {
    const config = useRuntimeConfig()
    const catalogItems = ref<CatalogItem[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const fetchCatalogItems = async (limit = 6) => {
        try {
            isLoading.value = true
            const baseUrl = config.public.apiBaseUrl
            const endpoint = config.public.apiProductsEndpoint

            if (!baseUrl) {
                throw new Error('API base URL is not configured')
            }

            const apiUrl = `${baseUrl}${endpoint}?limit=${limit}`
            const response = await fetch(apiUrl)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            catalogItems.value = await response.json()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error('Failed to fetch catalog items:', err)
        } finally {
            isLoading.value = false
        }
    }

    const formatPrice = computed(() => {
        return (price: number) => price.toFixed(2).replace('.', ',')
    })

    return { catalogItems, isLoading, error, fetchCatalogItems, formatPrice }
}
