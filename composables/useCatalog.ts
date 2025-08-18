import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'

export interface CatalogItem {
    id: number
    title: string
    price: number
    image: string
    category: string
    inStock: boolean
    onSale: boolean
}

export const useCatalogApi = () => {
    const config = useRuntimeConfig()
    const catalogItems = ref<CatalogItem[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const DEFAULT_ITEM_LIMIT = 6

    const fetchCatalogItems = async (options: {
        limit?: number
        category?: string
        items?: CatalogItem[]
        applyLimit?: boolean
    }) => {
        try {
            isLoading.value = true

            if (options.items) {
                catalogItems.value = options.items
                return
            }

            const baseUrl = config.public.apiBaseUrl
            let endpoint = options.category
                ? `/products/category/${options.category}`
                : config.public.apiProductsEndpoint

            if (options.applyLimit && options.limit) {
                endpoint += `?limit=${options.limit}`
            }

            if (!baseUrl) {
                throw new Error('API base URL is not configured')
            }

            const apiUrl = `${baseUrl}${endpoint}`
            const response = await fetch(apiUrl)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            catalogItems.value = data.map((item: CatalogItem) => {
                return { ...item, onSale: Math.random() < 0.3, inStock: Math.random() < 0.8 }
            })
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

    return { catalogItems, isLoading, error, DEFAULT_ITEM_LIMIT, fetchCatalogItems, formatPrice }
}
