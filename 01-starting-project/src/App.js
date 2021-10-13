import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { cartActions } from "./store/cart-slice";
function App() {
  const dispatch =  useDispatch();
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  useEffect(() => {
    const sendCartData = async()=>{
      dispatch(cartActions);
   const response = await fetch('https://reacthook-f4714.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify(cart),
    }
  
    );
    if(!response.ok){
      throw new Error('sending cart data failed');
    }
  }
   
  }, [cart]);
 
  return (
    <Layout>
      {!isCartVisible && <Cart />}

      <Products />
    </Layout>
  );
}

export default App;
