/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, watch, computed } from 'vue'
import { debounce } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogApi } from '@/composables/useCatalogApi'

interface Filters {
    search: string
    priceRange: [number, number]
    onSale: boolean | null
    inStock: boolean | null
    category: string | null
    sortBy: string | null
}

const PRICE_RANGE = {
    MIN: 0,
    MAX: 1000,
}

const SORT_OPTIONS = {
    PRICE_ASC: 'price-asc',
    PRICE_DESC: 'price-desc',
    NAME_ASC: 'name-asc',
    NAME_DESC: 'name-desc',
}

const matchesSearch = (item: any, search: string): boolean => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
        item.title.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
    )
}

const matchesPriceRange = (item: any, priceRange: [number, number]): boolean => {
    return item.price >= priceRange[0] && item.price <= priceRange[1]
}

const matchesBoolean = (itemValue: boolean, filterValue: boolean | null): boolean => {
    return filterValue === null || itemValue === filterValue
}

const getSortFunction = (sortBy: string | null) => {
    if (!sortBy) return () => 0

    switch (sortBy) {
        case SORT_OPTIONS.PRICE_ASC:
            return (a: any, b: any) => a.price - b.price
        case SORT_OPTIONS.PRICE_DESC:
            return (a: any, b: any) => b.price - a.price
        case SORT_OPTIONS.NAME_ASC:
            return (a: any, b: any) => a.title.localeCompare(b.title)
        case SORT_OPTIONS.NAME_DESC:
            return (a: any, b: any) => b.title.localeCompare(a.title)
        default:
            return () => 0
    }
}

export const useCatalogFilters = () => {
    const route = useRoute()
    const router = useRouter()

    const { catalogItems, isLoading, error, DEFAULT_ITEM_LIMIT, fetchCatalogItems } =
        useCatalogApi()

    const filters = ref<Filters>({
        search: route.query.searchQuery?.toString() || '',
        priceRange: [
            route.query.minPrice ? Number(route.query.minPrice) : PRICE_RANGE.MIN,
            route.query.maxPrice ? Number(route.query.maxPrice) : PRICE_RANGE.MAX,
        ] as [number, number],
        onSale: route.query.onSale ? route.query.onSale === 'true' : null,
        inStock: route.query.inStock ? route.query.inStock === 'true' : null,
        category: route.query.category?.toString() || null,
        sortBy: route.query.sortBy?.toString() || null,
    })

    const updateURL = debounce(() => {
        const query: Record<string, string> = {}

        if (filters.value.search) query.searchQuery = filters.value.search
        if (
            filters.value.priceRange[0] !== PRICE_RANGE.MIN ||
            filters.value.priceRange[1] !== PRICE_RANGE.MAX
        ) {
            query.minPrice = filters.value.priceRange[0].toString()
            query.maxPrice = filters.value.priceRange[1].toString()
        }

        if (filters.value.onSale !== null) query.onSale = String(filters.value.onSale)
        if (filters.value.inStock !== null) query.inStock = String(filters.value.inStock)

        if (filters.value.category !== null) query.category = filters.value.category
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
            filters.value.search = newQuery.searchQuery?.toString() || ''
            filters.value.priceRange = [
                newQuery.minPrice ? Number(newQuery.minPrice) : PRICE_RANGE.MIN,
                newQuery.maxPrice ? Number(newQuery.maxPrice) : PRICE_RANGE.MAX,
            ]
            filters.value.onSale = newQuery.onSale ? newQuery.onSale === 'true' : null
            filters.value.inStock = newQuery.inStock ? newQuery.inStock === 'true' : null
            filters.value.category = newQuery.category?.toString() || null
            filters.value.sortBy = newQuery.sortBy?.toString() || null
        },
    )

    const filteredProducts = computed(() => {
        if (!catalogItems.value?.length) return []

        return catalogItems.value
            .filter((item) => {
                const conditions = [
                    matchesSearch(item, filters.value.search),
                    matchesPriceRange(item, filters.value.priceRange),
                    matchesBoolean(item.onSale, filters.value.onSale),
                    matchesBoolean(item.inStock, filters.value.inStock),
                ]
                return conditions.every(Boolean)
            })
            .sort(getSortFunction(filters.value.sortBy))
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
