import React, { createContext, useContext, useState } from 'react';
import { INITIAL_LISTINGS, RowItem } from './components/utils.tsx';

interface UploadContextProps {
  rows: RowItem[];
  saveRows: (data: RowItem[] | ((prevRows: RowItem[]) => RowItem[])) => void;
  resetOptions: () => void;
};

const UploadContext = createContext<
  UploadContextProps | undefined
>(undefined);
const useUploadContext = (): UploadContextProps => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error(
      'useUploadContext must be used within a UploadContextProvider'
    );
  }
  return context;
};

const UploadContextProvider = ({ children }: any) => {
  const [rows, setRows] = useState<RowItem[]>(INITIAL_LISTINGS);

  const saveRows = (updater: RowItem[] | ((prevRows: RowItem[]) => RowItem[])) => {
    if (typeof updater === 'function') {
      setRows((prevRows) => updater(prevRows));
    } else {
      setRows(updater);
    }
  };

  const resetOptions = (): void => {
    setRows(INITIAL_LISTINGS);
  }

  const value: UploadContextProps = {
    rows,
    saveRows,
    resetOptions,
  };

  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  );
};

export {
  UploadContext,
  UploadContextProvider,
  useUploadContext,
}