import { h } from "preact";
import PaymentProvider from "../../components/PaymentProvider";
import useApplicationVendors from "../../hooks/queries/useApplicationVendors";
import style from "./popup.css";

const Popup = ({ pubKey }) => {
  const opts = useApplicationVendors(pubKey);

  console.log(opts)

  return (
    <div class={style.popupContainer}>
      <section class={style.popup}>
        <div class={style.popup__heading}>
          <h1 class={style.popup__title}>Card payments</h1>
          <p class={style.popup__subtitle}>Payment options</p>
        </div>
        <div class={style.popup__content}>
          <PaymentProvider src="hrll" provider={"flutterwave"} />
        </div>
      </section>
    </div>
  );
};

export default Popup;
