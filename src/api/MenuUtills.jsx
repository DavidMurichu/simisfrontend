import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

const initialState = {
    openedItem: 'dashboard',
    openedComponent: 'buttons',
    openedHorizontalItem: null,
    isDashboardDrawerOpened: false,
    isComponentDrawerOpened: true,
};

export const endpoints = {
    key: 'api/menu',
    master: 'master',
    dashboard: '/dashboard',
};

export function useGetMenuMaster() {
    const { data, isLoading } = useSWR(
        `${endpoints.key}${endpoints.master}`,
        () => initialState,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const memoizedValue = useMemo(
        () => ({
            menuMaster: data,
            menuMasterLoading: isLoading,
        }),
        [data, isLoading]
    );

    return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
    mutate(
        `${endpoints.key}${endpoints.master}`,
        (currentMenuMaster) => ({
            ...currentMenuMaster,
            isDashboardDrawerOpened,
        }),
        false
    );
}

export function handlerActiveItem(openedItem) {
    mutate(
        `${endpoints.key}${endpoints.master}`,
        (currentMenuMaster) => ({
            ...currentMenuMaster,
            openedItem,
        }),
        false
    );
}