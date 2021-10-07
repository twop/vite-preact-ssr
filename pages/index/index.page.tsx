import { PageProps } from "../../renderer/types";
import { App } from "../../src/app";

export { Page };

// function Page() {
function Page({ productName }: PageProps) {
  return <App productName={productName} />;
}
