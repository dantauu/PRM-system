import { routes } from '@/shared/router';
import { getShopItemsFx } from "@/shared/api/marketplace/get-shop-items"
import { attach, createStore, restore, sample } from "effector"

const getItemsFx = attach({ effect: getShopItemsFx })

const $shopItems = restore(getItemsFx, [])

export const marketplace = {
    $shopItems,
    getItemsFx
}