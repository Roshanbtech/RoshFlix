import { useEffect } from "react";
const useInfiniteScroll = (callback, canLoadMore = true, threshold = 300) => {
  useEffect(() => {
    if (!canLoadMore) return;

    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;
      if (scrolledToBottom) callback();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, canLoadMore, threshold]);
};

export default useInfiniteScroll;
