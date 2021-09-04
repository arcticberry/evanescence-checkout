import { h } from "preact";
import PaymentProvider from "../../components/PaymentProvider";
import Loader from "../../components/Loader";
import useApplicationVendors from "../../hooks/queries/useApplicationVendors";
import style from "./popup.css";
import LazyLoadedImage from "../../components/LazyImage";
import Logo from "../../components/Logo";

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
        <div class={style.popup__footer}>
          <div class={style.popup__message}>
            <span>With love </span>
            <span class={style.popup__icon}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                tabindex="-1"
                title="Favorite"
              >
                <path
                  fill={"currentColor"}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </span>
          </div>
          <span style={{ width: "8rem" }}>
            <Logo />
          </span>
        </div>
      </section>
    </div>
  );
};

export default Popup;
