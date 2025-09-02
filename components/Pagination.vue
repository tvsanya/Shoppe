<template>
    <div class="pagination-container">
        <button
            class="pagination-button"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
        >
            <PrevPage />
        </button>
        <ul class="pagination">
            <li
                v-for="page in visiblePages"
                :key="page"
                class="pagination-item"
                :class="{ active: currentPage === page, ellipsis: page === '...' }"
                @click="page !== '...' ? changePage(page) : null"
            >
                {{ page }}
            </li>
        </ul>
        <button
            class="pagination-button"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
        >
            <NextPage />
        </button>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import NextPage from '@/components/icons/NextPage.vue'
    import PrevPage from '@/components/icons/PrevPage.vue'

    interface Props {
        currentPage: number
        totalPages: number
        itemsPerPage?: number
        maxItems?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        itemsPerPage: 6,
        maxItems: 30,
    })

    const emit = defineEmits(['pageChanged'])

    const maxVisiblePages = computed(() => {
        return Math.min(Math.ceil(props.maxItems / props.itemsPerPage), props.totalPages)
    })

    const visiblePages = computed(() => {
        if (props.totalPages <= maxVisiblePages.value) {
            return Array.from({ length: props.totalPages }, (_, i) => i + 1)
        }
        if (props.currentPage <= maxVisiblePages.value - 1) {
            return [
                ...Array.from({ length: maxVisiblePages.value }, (_, i) => i + 1),
                '...',
                props.totalPages,
            ]
        }
        if (props.currentPage > props.totalPages - maxVisiblePages.value + 1) {
            return [
                1,
                '...',
                ...Array.from(
                    { length: maxVisiblePages.value },
                    (_, i) => props.totalPages - maxVisiblePages.value + i + 1,
                ),
            ]
        }
        return [
            1,
            '...',
            props.currentPage - 1,
            props.currentPage,
            props.currentPage + 1,
            '...',
            props.totalPages,
        ]
    })

    const changePage = (page: number | string) => {
        if (page === '...' || typeof page !== 'number') return

        const newPage = Math.max(1, Math.min(page, props.totalPages))
        if (newPage !== props.currentPage) {
            emit('pageChanged', newPage)
        }
    }
</script>

<style lang="scss" scoped>
    .pagination-container {
        display: flex;
        gap: 12px;
        justify-content: center;
        width: 100%;

        .pagination {
            display: flex;
            gap: 12px;
            align-items: center;

            .pagination-item {
                @include body-medium(#000000);

                display: flex;
                align-items: center;
                justify-content: center;
                width: 46px;
                height: 46px;
                cursor: pointer;
                background-color: #ffffff;
                border: 1px solid #9e9e9e;
                border-radius: 2px;

                &.active {
                    color: #ffffff;
                    background-color: #000000;
                }

                &:hover {
                    color: #ffffff;
                    background-color: #000000;
                    transition: all 0.3s;
                }
            }
        }

        .pagination-button {
            @include body_medium(#000000);

            display: flex;
            align-items: center;
            justify-content: center;
            width: 46px;
            height: 46px;
            cursor: pointer;
            background-color: transparent;
            border: 1px solid #9e9e9e;
            border-radius: 2px;

            &:disabled {
                color: #cccccc;
                cursor: not-allowed;
                opacity: 0.5;
            }

            &:hover {
                color: #ffffff;
                background-color: #000000;
                transition: all 0.3s;

                &svg path {
                    fill: #ffffff;
                }
            }
        }
    }
</style>
