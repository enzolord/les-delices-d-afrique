import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface CartItem {
  /** Identifiant unique de la ligne panier. Pour un plat à formats multiples
   * (ex. jus en petit/grand format), inclut le format pour éviter que les
   * deux formats ne fusionnent en une seule ligne : "jus-baobab::Grand format" */
  id: string;
  name: string;
  price: number;
  quantity: number;
  /** Note libre éditable par le client (ex. "sans oignon", précision d'accompagnement) */
  note?: string;
  /** Placeholder affiché dans le champ note quand elle est vide (ex. plats à choix) */
  noteHint?: string;
}

export type ReceptionMode = 'sur-place' | 'emporter' | 'livraison';

interface AddItemInput {
  id: string;
  name: string;
  price: number;
  noteHint?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (input: AddItemInput) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  updateNote: (id: string, note: string) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((input: AddItemInput) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === input.id);
      if (existing) {
        return prev.map((i) => (i.id === input.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        { id: input.id, name: input.name, price: input.price, quantity: 1, noteHint: input.noteHint },
      ];
    });
  }, []);

  const incrementItem = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  }, []);

  const decrementItem = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateNote = useCallback((id: string, note: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, note } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.quantity * i.price, 0), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    updateNote,
    clear,
    totalItems,
    totalPrice,
    isOpen,
    open,
    close,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart doit être utilisé à l\u2019intérieur de <CartProvider>');
  }
  return ctx;
}
