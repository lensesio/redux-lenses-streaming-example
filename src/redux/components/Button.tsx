import React, { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

function Button<T extends object>(props: Props & T): JSX.Element {
  const { children, ...restProps } = props;
  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
}

export default Button;
