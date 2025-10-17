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

const catalogItems = ref<CatalogItem[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const hasLoaded = ref(false)

export const useCatalogApi = () => {
    const config = useRuntimeConfig()
    const DEFAULT_ITEM_LIMIT = 6

    const fetchCatalogItems = async (
        options: {
            limit?: number
            category?: string | null
            items?: CatalogItem[]
        } = {},
    ) => {
        try {
            isLoading.value = true
            error.value = null

            if (options?.items) {
                catalogItems.value = options.items
                hasLoaded.value = true
                return
            }

            const baseUrl = config.public.apiBaseUrl
            let endpoint = options?.category
                ? `/products/category/${options.category}`
                : config.public.apiProductsEndpoint || '/products'

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
                return {
                    ...item,
                    onSale: Math.random() < 0.3,
                    inStock: Math.random() < 0.8,
                }
            })

            hasLoaded.value = true
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
