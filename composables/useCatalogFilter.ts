import { ref, watch, computed } from 'vue'
import { debounce } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogApi } from '@/composables/useCatalog'

interface Filters {
    search: string
    priceRange: [number, number]
    onSale: boolean | null
    inStock: boolean | null
    category: string | null
    sortBy: string | null
}

export const useCatalogFilters = () => {
    const route = useRoute()
    const router = useRouter()

    const { catalogItems, isLoading, error, DEFAULT_ITEM_LIMIT, fetchCatalogItems } =
        useCatalogApi()

    const filters = ref<Filters>({
        search: route.query.searchQuery?.toString() || '',
        priceRange: [
            route.query.minPrice ? Number(route.query.minPrice) : 0,
            route.query.maxPrice ? Number(route.query.maxPrice) : 1000,
        ] as [number, number],
        onSale: route.query.onSale ? route.query.onSale === 'true' : null,
        inStock: route.query.inStock ? route.query.inStock === 'true' : null,
        category: route.query.category?.toString() || null,
        sortBy: route.query.sortBy?.toString() || null,
    })

    const updateURL = debounce(() => {
        const query: Record<string, string> = {}

        if (filters.value.search) query.searchQuery = filters.value.search
        if (filters.value.priceRange[0] !== 0 || filters.value.priceRange[1] !== 200) {
            query.minPrice = filters.value.priceRange[0].toString()
            query.maxPrice = filters.value.priceRange[1].toString()
        }

        if (filters.value.onSale !== null) query.onSale = String(filters.value.onSale)
        if (filters.value.inStock !== null) query.inStock = String(filters.value.inStock)

        if (filters.value.category) query.category = filters.value.category
        if (filters.value.sortBy) query.sortBy = filters.value.sortBy

        router.replace({ query })
    }, 500)

    watch(
        () => ({
            search: filters.value.search,
            priceRange: [...filters.value.priceRange],
            onSale: filters.value.onSale,
            inStock: filters.value.inStock,
            category: filters.value.category,
            sortBy: filters.value.sortBy,
        }),
        updateURL,
        { deep: true },
    )

    watch(
        () => route.query,
        (newQuery) => {
            ;((filters.value.search = newQuery.searchQuery?.toString() || ''),
                ((filters.value.priceRange = [
                    newQuery.minPrice ? Number(newQuery.minPrice) : 0,
                    newQuery.maxPrice ? Number(newQuery.maxPrice) : 1000,
                ]),
                (filters.value.onSale = newQuery.onSale ? newQuery.onSale === 'true' : null),
                (filters.value.inStock = newQuery.inStock ? newQuery.inStock === 'true' : null),
                (filters.value.category = newQuery.category?.toString() || ''),
                (filters.value.sortBy = newQuery.sortBy?.toString() || '')))
        },
    )

    const filteredProducts = computed(() => {
        if (!catalogItems.value || catalogItems.value.length === 0) return []

        let result = [...catalogItems.value]

        result = result.filter((item) => {
            const search = filters.value.search.toLowerCase()
            const matchesSearch =
                item.title.toLowerCase().includes(search) ||
                item.category.toLowerCase().includes(search)
            const matchesPrice =
                item.price >= filters.value.priceRange[0] &&
                item.price <= filters.value.priceRange[1]

            let matchesOnSale = true
            if (filters.value.onSale !== null) {
                matchesOnSale = item.onSale === filters.value.onSale
            }

            let matchesInStock = true
            if (filters.value.inStock !== null) {
                matchesInStock = item.inStock === filters.value.inStock
            }

            const matchesCategory =
                !filters.value.category || item.category === filters.value.category

            return (
                matchesSearch && matchesPrice && matchesOnSale && matchesInStock && matchesCategory
            )
        })

        if (filters.value.sortBy) {
            switch (filters.value.sortBy) {
                case 'price-asc':
                    result.sort((a, b) => a.price - b.price)
                    break
                case 'price-desc':
                    result.sort((a, b) => b.price - a.price)
                    break
                case 'name-asc':
                    result.sort((a, b) => a.title.localeCompare(b.title))
                    break
                case 'name-desc':
                    result.sort((a, b) => b.title.localeCompare(a.title))
                    break
            }
        }
        return result
    })

    watch(filteredProducts, (result) => {
        console.log(
            'Sorted results:',
            result.map((item) => ({
                title: item.title,
                price: item.price,
                sortBy: filters.value.sortBy,
            })),
        )
    })

    return {
        filters,
        filteredProducts,
        isLoading,
        fetchCatalogItems,
        error,
        DEFAULT_ITEM_LIMIT,
        catalogItems,
    }
}
