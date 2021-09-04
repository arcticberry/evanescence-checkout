import { h } from "preact";
import { Link } from "preact-router";
import LazyLoadedImage from "../LazyImage";
import style from "./payment-provider.css";

const PaymentProvider = ({ provider, label, src }) => {
  return (
    <Link href="/" class={style.provider}>
      <section class="flex">
        <div class={style.provider__logo}>
          <LazyLoadedImage src={src} />
        </div>
        <h2 class={style.provider__title}>Pay with {label}</h2>
      </section>
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
