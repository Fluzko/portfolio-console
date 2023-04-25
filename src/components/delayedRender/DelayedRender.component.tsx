import { FC, ReactElement, useEffect, useState } from "react";

type DelayedRenderComponent = FC<{
  children: ReactElement;
  delay?: number;
}>;

const sleep = (delay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

export const DelayedRender: DelayedRenderComponent = ({
  children,
  delay = 1e3,
}) => {
  const [cmp, setCmp] = useState<ReactElement>(<></>);

  useEffect(() => {
    sleep(delay).then(() => setCmp(children));
  }, []);

  return cmp;
};
