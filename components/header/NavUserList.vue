<template>
    <ul class="header__nav-users-list" :class="`header__nav-user-list--${showAs}`">
        <li v-for="(item, index) in visibleItems" :key="index" class="header__users-item">
            <button
                v-if="item.path === '/search' && showAs === 'desktop'"
                class="header__users-item-link header__search-button"
                @click="openSearch"
            >
                <component :is="item.icon" />
            </button>
            <NuxtLink
                v-else-if="item.path !== '/search'"
                :to="item.path"
                class="header__users-item-link"
                @click="handleClick"
            >
                <div class="header__users-item-content">
                    <component :is="item.icon" />
                    <span v-if="item.title && showAs === 'mobile'" class="header__item-title">{{
                        item.title
                    }}</span>
                </div>
            </NuxtLink>
        </li>
    </ul>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import type { DefineComponent } from 'vue'
    import SearchComp from '@/components/icons/SearchComp.vue'
    import ShopCartComp from '@/components/icons/ShopCartComp.vue'
    import ProfileComp from '@/components/icons/ProfileComp.vue'
    import LogoutComp from '@/components/icons/LogoutComp.vue'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type VueComponent = DefineComponent<{}, {}, any>

    interface NavUser {
        path: string
        icon: VueComponent
        alt: string
        showIn?: string[]
        title?: string
    }

    const emit = defineEmits<{
        (e: 'click'): void
        (e: 'open-search'): void
    }>()

    const props = withDefaults(
        defineProps<{
            showAs?: 'desktop' | 'mobile'
        }>(),
        {
            showAs: 'desktop',
        },
    )

    const normalizeNavUsers = (items: NavUser[]): Required<NavUser>[] => {
        return items.map((item) => ({
            path: item.path,
            icon: item.icon,
            alt: item.alt ?? '',
            title: item.title ?? '',
            showIn: item.showIn ?? [],
        }))
    }

    const navUser = normalizeNavUsers([
        {
            path: '/search',
            icon: SearchComp,
            alt: 'Search',
            showIn: ['desktop', 'mobile'],
        },
        {
            path: '/shopcart',
            icon: ShopCartComp,
            alt: 'ShopCart',
            showIn: ['desktop', 'mobile'],
        },
        {
            path: '/profile',
            icon: ProfileComp,
            alt: 'My account',
            showIn: ['desktop', 'mobile'],
            title: 'My account',
        },
        {
            path: '/',
            icon: LogoutComp,
            alt: 'LogOut',
            showIn: ['mobile'],
            title: 'Logout',
        },
    ])

    const visibleItems = computed(() => {
        return navUser.filter((item) => item.showIn.includes(props.showAs))
    })

    const handleClick = () => {
        if (props.showAs === 'mobile') {
            emit('click')
        }
    }

    const openSearch = () => {
        emit('open-search')
    }
</script>

<style lang="scss" scoped>
    .header__nav-users-list {
        position: relative;
        display: flex;
        gap: 38px;
        align-items: center;

        .header__users-item-link {
            position: relative;
            display: flex;
            transition: all 0.3s ease;

            .header__users-item-content {
                display: flex;
                gap: 10px;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;

                .header__item-title {
                    @include h5(#000000);
                }

                &:hover {
                    transform: scale(1.1);
                }
            }

            &.header__search-button {
                background-color: transparent;
            }

            &:focus,
            &:active {
                &::after {
                    position: absolute;
                    bottom: -22px;
                    left: 0;
                    width: 24px;
                    height: 3px;
                    content: '';
                    background: #000000;
                }
            }

            img {
                width: 100%;
                height: auto;
                object-fit: contain;
            }
        }
    }

    @media (max-width: $breakpoints-l) {
        .header__nav-user-list--desktop {
            .header__users-item {
                &:nth-child(1),
                &:nth-child(3) {
                    display: none;
                }
            }
        }

        .header__nav-user-list--mobile {
            display: flex;
            flex-direction: column;
            gap: 24px;
            align-items: start;

            .header__users-item {
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: center;

                &:nth-child(1) {
                    display: none;
                }

                &:nth-child(2) {
                    display: none;
                }

                &-link::after {
                    display: none;
                }
            }
        }
    }
</style>
