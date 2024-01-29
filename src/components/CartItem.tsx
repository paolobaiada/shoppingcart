import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button, Stack } from "react-bootstrap";

type CartItemProps = {
  id: number;
  quantity: number;
};



export const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart,items } = useShoppingCart();
  const item = items.find((item) => item.id === id);
  if (item == null) return null;




  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-item-center">
      <img src={item.image} style={{ width: "125px" }} alt="" />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "1rem" }}>
              {quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "1rem" }}>
          {item.price}
        </div>
      </div>
      <div>{item.price * quantity}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};
