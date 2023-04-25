import { FC, useEffect, useState } from "react";

type TypewritterEffectComponent = FC<{
  text: string;
  delay?: number;
}>;

export const TypewritterEffect: TypewritterEffectComponent = ({
  text,
  delay = 25,
}) => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    let timer: number;
    const typing = async () => {
      for (let i = 0; i < text.length; i++) {
        await new Promise<void>(resolve => {
          timer = setTimeout(() => {
            setDisplayText(prevText => prevText + text[i]);
            resolve();
          }, delay);
        });
      }
    };
    typing();
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayText}</span>;
};
