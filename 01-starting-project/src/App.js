import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import React from "react";
import Notification from "./components/UI/Notification";
function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notificationStatus = useSelector((state) => state.ui.notifications);
  console.log(cart);
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "SEnding cart data",
        })
      );
      const response = await fetch(
        "https://reacthook-f4714.firebaseio.com/cart.jsons",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "added items to cart successfully",
        })
      );
    };
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notificationStatus && (
        <Notification
          title={notificationStatus.title}
          message={notificationStatus.message}
        ></Notification>
      )}
      <Layout>
        {!isCartVisible && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
