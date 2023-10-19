import React, { useEffect, useRef, useState } from "react";
// import { DynamicSVGImportOptions } from "./types/interfaces";
import DefaultIcon from "./assets/default.svg";

export default function useSocLinkSVGImport(name, iconSet, options = {},
) {
  const [svgPath, setPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { onCompleted=()=>{}, onError } = options;

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {

        const res = await import(
            `./assets/${iconSet}/${name.toLowerCase()}.svg`
            )
        setPath(res.default);
        onCompleted && onCompleted(name, res.default);
      } catch (err) {
        if (err.message.includes("Cannot find module")) {
          setPath(DefaultIcon);
          onCompleted(name, svgPath);
        } else {
          console.error("IMPORT ERROR", err.message);
          onError && onError(err);
          setError && setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, svgPath };
}
