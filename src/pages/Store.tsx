import { Col, Row } from "react-bootstrap";
import { StoreItems } from "../components/StoreItems";
import { useShoppingCart } from "../context/ShoppingCartContext";

export const Store = () => {

 const {items} = useShoppingCart()
  return (
    <div>
      <h1>Store</h1>

      <Row xs={1} md={2} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <StoreItems {...item}/>
          </Col>
        ))}
        
      </Row>
    </div>
  );
};
