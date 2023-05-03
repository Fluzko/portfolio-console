import { useEffect } from "react";

export const useKeepBottomScroll = (elem: HTMLElement | null) => {
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    if (!elem) return;

    const resizeObserver = new ResizeObserver(scrollToBottom);
    resizeObserver.observe(elem);

    return () => resizeObserver.disconnect();
  }, [elem]);

  return { scrollToBottom };
};
