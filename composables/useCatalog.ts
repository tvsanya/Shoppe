import { ref } from 'vue'

interface CatalogItem {
    id: number
    title: string
    price: number
    image: string
}

export const useCatalogApi = () => {
    const catalogItems = ref<CatalogItem[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const fetchCatalogItems = async (limit = 6) => {
        try {
            isLoading.value = true
            const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`)
            catalogItems.value = await response.json()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
        } finally {
            isLoading.value = false
        }
    }

    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',')
    }

    return { catalogItems, isLoading, error, fetchCatalogItems, formatPrice }
}
