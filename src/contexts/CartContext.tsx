import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';

export interface CartItem {
    idProduct: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

type CartContextData = {
    items: CartItem[];
    total: number;
    itemCount: number;
    addItem: (item: CartItem) => void;
    removeItem: (idProduct: string) => void;
    updateQuantity: (idProduct: string, quantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('@IHunger:cart');
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });

    const saveCart = useCallback((newItems: CartItem[]) => {
        setItems(newItems);
        if (typeof window !== 'undefined') {
            localStorage.setItem('@IHunger:cart', JSON.stringify(newItems));
        }
    }, []);

    const addItem = useCallback(
        (item: CartItem) => {
            const existing = items.find(i => i.idProduct === item.idProduct);
            const newItems = existing
                ? items.map(i =>
                      i.idProduct === item.idProduct
                          ? { ...i, quantity: i.quantity + item.quantity }
                          : i,
                  )
                : [...items, item];
            saveCart(newItems);
        },
        [items, saveCart],
    );

    const removeItem = useCallback(
        (idProduct: string) => {
            saveCart(items.filter(i => i.idProduct !== idProduct));
        },
        [items, saveCart],
    );

    const updateQuantity = useCallback(
        (idProduct: string, quantity: number) => {
            if (quantity <= 0) {
                removeItem(idProduct);
                return;
            }
            saveCart(
                items.map(i =>
                    i.idProduct === idProduct ? { ...i, quantity } : i,
                ),
            );
        },
        [items, saveCart, removeItem],
    );

    const clearCart = useCallback(() => saveCart([]), [saveCart]);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                total,
                itemCount,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
