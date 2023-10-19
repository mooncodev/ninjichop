import React, { useEffect, useRef, useState } from "react";
// import { DynamicSVGImportOptions } from "./types/interfaces";
import DefaultIcon from "./assets/default.svg";

export default function useDynamicSVGImport(name, options = {},
) {
  const [svgPath, setPath] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  let { onCompleted, onError } = options;
  if(!onCompleted) {
    onCompleted = () => {}
  }
  if(!onError) {
    onError = () => {}
  }
  useEffect(() => {
    if(loading){
      const importIcon = async () => {
        try {

          const res = await import(
            `./assets/${name.toLowerCase()}.svg`
            )
          setPath(res.default);
          if(onCompleted && typeof(onCompleted)==='function'){
            onCompleted(name, res.default);
          }
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
      importIcon().catch(e=>{console.error("IMPORT ERROR", e)});
    }
  }, [name, onCompleted, onError]);

  return { error, loading, svgPath };
}
