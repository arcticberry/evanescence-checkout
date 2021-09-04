import { h } from "preact";
import PaymentProvider from "../../components/PaymentProvider";
import Loader from "../../components/Loader";
import useApplicationVendors from "../../hooks/queries/useApplicationVendors";
import style from "./popup.css";

const Popup = ({ pubKey }) => {
  const opts = useApplicationVendors(pubKey);

  const { isError, isLoading, data: application } = opts;

  if (isLoading) return <Loader withContainer />;
  if (isError) return <div>Unable to load payment providers</div>;

  return (
    <div class={style.popupContainer}>
      <section class={style.popup}>
        <div class={style.popup__heading}>
          <h1 class={style.popup__title}>Card payments</h1>
          <p class={style.popup__subtitle}>Payment options</p>
        </div>
        <div class={style.popup__content}>
          {application?.data.appPaymentVendors.map((vendor) => (
            <PaymentProvider
              key={vendor.name}
              provider={vendor.name}
              src={vendor.brandUrl}
              label={vendor.label}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Popup;
