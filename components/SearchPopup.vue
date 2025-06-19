<template>
    <div v-if="isSearchVisible" class="search__container">
        <button class="search__button">
            <SearchInputComp />
        </button>
        <input
            ref="searchInput"
            class="search__input"
            type="text"
            placeholder="Search"
            @blur="closeSearch"
            @keyup.esc="handleEsc"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
    isMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isMobile: false,
})

const emit = defineEmits<{
    (e: 'close'): void
}>()

const searchInput = ref<HTMLInputElement | null>(null)
const isSearchVisible = ref(true)

const handleEsc = () => {
    if (!props.isMobile) {
        emit('close')
    }
}

const closeSearch = () => {
    if (!props.isMobile) {
        isSearchVisible.value = false
        emit('close')
    }
}

watch(
    () => props.isMobile,
    (newVal) => {
        if (newVal) {
            isSearchVisible.value = true
            if (searchInput.value) {
                searchInput.value.focus()
            }
        }
    },
    { immediate: true }
)
</script>

<style lang="scss" scoped>
.search__container {
    @include body_medium(#707070);
    display: flex;
    background-color: #efefef;
    height: 32px;
    border-radius: 4px;
    padding-left: 10px;
    gap: 8px;
    align-items: center;
    margin: 10px 0 16px;

    @media (max-width: $breakpoints-m) {
        margin-top: 4px;
    }

    .search__button {
        background-color: transparent;

        svg path {
            fill: none;
            color: #707070;
        }
    }

    .search__input {
        background: transparent;
        width: 100%;
        height: 100%;
    }
}
</style>
