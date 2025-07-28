import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setData(null);

    axios.get(url)
      .then(res => {
        if (res.data.Response === "False") {
          if (isMounted) setError(res.data.Error || "API Error");
        } else if (isMounted) {
          setData(res.data);
        }
      })
      .catch(err => isMounted && setError(err.message))
      .finally(() => isMounted && setLoading(false));

    return () => { isMounted = false; };
  }, deps);

  return { data, loading, error };
};

export default useFetch;
