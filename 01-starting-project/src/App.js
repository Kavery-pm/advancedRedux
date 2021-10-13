import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  useEffect(() => {
    fetch('https://reacthook-f4714.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify(cart),

    })
   
  }, [cart]);
 
  return (
    <Layout>
      {!isCartVisible && <Cart />}

      <Products />
    </Layout>
  );
}

export default App;
