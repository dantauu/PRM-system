import { IShopItem } from "@/types/shop-items";
import { createEffect } from "effector";
import { request } from "../request";

export const getShopItemsFx = createEffect<unknown, IShopItem[]>((param?: string) => {

    let url = 'shop-items/'

    if (param) url = `shop-items/?${param}`

    return request(url, {method: 'GET'})
})