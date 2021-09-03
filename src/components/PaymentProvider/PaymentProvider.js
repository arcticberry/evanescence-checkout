import { h } from "preact";
import { Link } from "preact-router";
import LazyLoadedImage from "../LazyImage";
import style from "./payment-provider.css";

const PaymentProvider = ({ provider, src }) => {
  return (
    <Link href="/" class={style.provider}>
      <LazyLoadedImage class={style.provider__logo} src={src} />
      <h2 class={style.provider__title}>Pay with {provider}</h2>
      <div class={style.provider__control}>
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          title="ChevronRight"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
          />
        </svg>
      </div>
    </Link>
  );
};

export default PaymentProvider;
