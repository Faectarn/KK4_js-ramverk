import { atom, selector } from "recoil";

export const productState = atom({
    key: "productState",
    default: [],
});

export const cartState = atom({
    key: "cartState",
    default: [],
})

export const cartListStatsState = selector({
    key: 'CartListStats',
    get: ({ get }) => {
        const cartList = get(cartState);
        const itemsInCart = cartList.length;
        const totalItemsInCart = cartList.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0);

        return {
            itemsInCart,
            totalItemsInCart,
        };
    },
});

export const categoryState = atom({
    key: "categoryState",
    default: [],
});