import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header
        itemsInCart={props.itemsInCart}
        setItemsInCart={props.setItemsInCart}
      />
      {props.children}
      <Footer />
    </div>
  );
}
