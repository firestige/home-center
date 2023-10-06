import React, {Suspense} from "react";
import { JSX } from "react/jsx-runtime";
import Loader from "./Loader";

const Loadable = (Component: React.FC) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;