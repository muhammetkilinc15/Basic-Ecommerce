import { createSlice } from "@reduxjs/toolkit";

// LocalStorage'dan basket verisini al
const getBasketRowStorage = () => {
    return JSON.parse(localStorage.getItem("basket")) || []; // Eğer localStorage'da veri yoksa boş bir dizi döndür
};

// Basket verisini localStorage'a yaz
const writeProBasketStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
};

const initialState = {
    products: getBasketRowStorage(), // Başlangıçta boş bir dizi döner
    basketProductCount: getBasketRowStorage().length,
    loading: false,
  };

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addProBasket: (state, action) => {
            // Ürünü bul
            const findProduct = state.products.find((product) => product.id === action.payload.id);

            if (findProduct) {
                // Ürün zaten varsa, miktarı artır
                findProduct.productCount += action.payload.productCount;

                // Mevcut ürünler listesinde bu ürün zaten referans olarak bulunduğu için state.products doğrudan güncellenir
                writeProBasketStorage(state.products);
            } else {
                // Ürün yoksa, ekle
                state.products = [...state.products, action.payload];
                writeProBasketStorage(state.products);
            }
            
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            writeProBasketStorage(state.products)
          }
    },
    extraReducers: (builder) => {
        // Ek işlemler burada tanımlanabilir
    },
});

export const { addProBasket , removeProduct } = basketSlice.actions;
export default basketSlice.reducer;
