import { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import formatPrice from "../../utils/format-price";
import CartItem from "./CartItem/CartItem";

function Cart(props) {
    const cartContext = useContext(CartContext);
    const cartItemAddHandler = (item) => {
        cartContext.addItem(item);
    };
    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };
    const cartItems = cartContext.items.map(({ name, id, price, amount }) => (
        <CartItem
            key={id}
            name={name}
            price={price}
            amount={amount}
            onAdd={() => {
                cartItemAddHandler({ name, id, price, amount: 1 });
            }}
            onRemove={() => {
                cartItemRemoveHandler(id);
            }}
        />
    ));
    return (
        <Modal onBackdropClick={props.onHide}>
            <ul className={styles["cart-items"]}>{cartItems}</ul>
            <div className={styles.total}>
                <span>Total amount:</span>
                <span>{formatPrice(cartContext.totalAmount)}</span>
            </div>
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles["button--alt"]}
                    onClick={props.onHide}
                >
                    Close
                </button>
                {cartContext.items.length !== 0 && (
                    <button type="button" className={styles["button"]}>
                        Order
                    </button>
                )}
            </div>
        </Modal>
    );
}

export default Cart;
