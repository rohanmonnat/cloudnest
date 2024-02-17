import { useState } from "react";

const useLoader = (initialState: boolean = true) => {
  const [loader, setLoader] = useState<boolean>(initialState);

  return { loader, setLoader };
};

export default useLoader;
