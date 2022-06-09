import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header // props drilling from _app.js to add useEffect in global app
        itemsInCookieCart={props.itemsInCookieCart}
        setItemsInCookieCart={props.setItemsInCookieCart}
      />
      {props.children}
      <Footer />
    </div>
  );
}
