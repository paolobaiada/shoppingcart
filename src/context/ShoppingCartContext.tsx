import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ShoppingCarts } from "../components/ShoppingCarts";
import axios from "axios";
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  itemQuantity: (id: number) => number;
  increaseCart: (id: number) => void;
  decreaseCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  items: StoreItemProps[];
  isOpen: boolean;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<StoreItemProps[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get("items.json");
      const data = response.data
      console.log(data);
      setItems(data);
    };
    dataFetch();
  }, []);

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const itemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCart = (id: number) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === id)) {
        return prev.map((item) => {
          return { ...item, quantity: item.quantity + 1 };
        });
      } else {
        return [...prev, { id, quantity: 1 }];
      }
    });
  };

  const decreaseCart = (id: number) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === id)?.quantity === 1) {
        return [...prev, { id, quantity: 1 }];
      } else {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number) =>
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  return (
    <ShoppingCartContext.Provider
      value={{
        itemQuantity,
        increaseCart,
        decreaseCart,
        removeFromCart,
        openCart,
        closeCart,
        items,
        cartItems,
        cartQuantity,
        isOpen,
      }}
    >
      {children}
      <ShoppingCarts />
    </ShoppingCartContext.Provider>
  );
};
