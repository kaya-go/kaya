/**
 * Inline rename field for a library tree row.
 *
 * The draft lives in local state: the panel only learns the new name once the
 * user commits, so typing never re-renders the tree.
 */

import React, { useEffect, useRef, useState } from 'react';

export interface LibraryRenameInputProps {
  initialValue: string;
  onCommit: (value: string) => void;
  onCancel: () => void;
}

export function LibraryRenameInput({ initialValue, onCommit, onCancel }: LibraryRenameInputProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  // Enter and blur can both fire for a single edit; only the first one counts,
  // and Escape must win over the blur it triggers.
  const commit = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCommit(value);
  };

  const cancel = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCancel();
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className="library-tree-node-input"
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={e => {
        e.stopPropagation();
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') cancel();
      }}
      onKeyUp={e => e.stopPropagation()}
      onKeyPress={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
    />
  );
}
