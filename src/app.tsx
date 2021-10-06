import { Logo } from "./logo";

export function App({ productName }: { productName: string }) {
  return (
    <>
      <Logo />
      <p>Hello Vite + Preact!</p>
      <p>
        <a
          class="link"
          href="https://preactjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Preact
        </a>
      </p>
      <p>Product Name: {productName}</p>
    </>
  );
}
