import React, {ReactNode, createContext, useContext, useState} from 'react';

const StoreContext = createContext({
  productsCart: new Map(),
  increaseItemCount: (_productId: number) => {},
  reduceItemCount: (_productId: number) => {},
  resetCart: () => {},
});

export function useStoreContext() {
  const contextValue = useContext(StoreContext);

  return contextValue;
}

interface StoreContextProviderProps {
  children: ReactNode;
}

export function StoreContextProvider({
  children,
}: StoreContextProviderProps): JSX.Element {
  const [productsCart, setProductsCart] = useState(new Map());

  function increaseItemCount(productId: number) {
    setProductsCart(prevCart => {
      const updatedCart = new Map(prevCart);
      updatedCart.set(productId, (updatedCart.get(productId) || 0) + 1);
      return updatedCart;
    });
  }

  function reduceItemCount(productId: number) {
    setProductsCart(prevCart => {
      const updatedCart = new Map(prevCart);
      const count = updatedCart.get(productId) || 0;
      if (count > 1) {
        updatedCart.set(productId, count - 1);
      } else if (count === 1) {
        updatedCart.delete(productId);
      }
      return updatedCart;
    });
  }

  function resetCart() {
    setProductsCart(new Map());
  }

  const value = {
    productsCart,
    increaseItemCount,
    reduceItemCount,
    resetCart,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
