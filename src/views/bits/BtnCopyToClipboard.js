import React from 'react';
import useCopyToClipboard from '../../hooks/useCopyToClipboard.js';
import { MdCopyAll, MdOutlineCheckCircle } from 'react-icons/md';

export function BtnCopyToClipboard({ code }) {
  // isCopied is reset after 3 second timeout
  const [isCopied, handleCopy] = useCopyToClipboard();
  return (
    <button onClick={() => handleCopy(code)}>
      {isCopied ? <MdOutlineCheckCircle/> : <MdCopyAll/>}
    </button>
  );
}
