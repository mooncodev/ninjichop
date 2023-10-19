import React, { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};

// export function useMutationObservable(targetEl, cb, options = DEFAULT_OPTIONS) {
//   const [observer, setObserver] = useState(null);
//   useEffect(() => {
//     const obs = new MutationObserver(cb);
//     setObserver(obs);
//   }, [cb, options, setObserver]);
//   useEffect(() => {
//     if (!observer) return;
//     const { config } = options;
//     observer.observe(targetEl, config);
//     return () => {
//       if (observer) {
//         observer.disconnect();
//       }
//     };
//   }, [observer, targetEl, options]);
// }

export function useMutationObservable(targetEl, cb, options = DEFAULT_OPTIONS) {
  useEffect(() => {
    if (targetEl) {
      const observer = new MutationObserver(cb);
      const { config } = options;
      observer.observe(targetEl, config);
      return () => {
        observer.disconnect();
      };
    }
  }, [targetEl, cb, options]);
}
/* usage:
const [scrollVis, setScrollVis] = useState('0');
const appMainRef = useRef(null);
const onAppMainMutation = useCallback((mutationList) => {
    if(scrollbarVisible(appMainRef.current)){
      setScrollVis('1');
    }else{setScrollVis('0');}
    // setScrollVis(mutationList[0].target.children.length);
  },
  [setScrollVis]
);
useMutationObservable(appMainRef.current, onAppMainMutation);
*/
