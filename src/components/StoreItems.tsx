import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const StoreItems: React.FC<StoreItemProps> = ({
  id,
  name,
  price,
  image,
}) => {
  const { itemQuantity, increaseCart, decreaseCart, removeFromCart } =
    useShoppingCart();
  const quantity = itemQuantity(id);
  return (
    <Card className="h-100 ">
      <Card.Img src={image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{price}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100 btn-dark" onClick={() => increaseCart(id)}>
              Add
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column g-3">
              <div className="d-flex  align-items-center justify-content-center gap-3">
                <Button onClick={() => decreaseCart(id)} className="btn-dark">-</Button>
                <div>
                  <div className="fs-3">{quantity}</div>
                </div>

                <Button onClick={() => increaseCart(id)} className="btn-dark">+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                className="m-2"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
