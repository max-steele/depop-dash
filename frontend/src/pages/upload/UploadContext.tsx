import React, { createContext, useContext, useState } from 'react';
import { Filter, INITIAL_LISTINGS, RowItem } from './components/utils.tsx';

interface UploadContextProps {
  filters: Filter[];
  saveFilters: (data: Filter[]) => void;
  rows: RowItem[];
  saveRows: (data: RowItem[] | ((prevRows: RowItem[]) => RowItem[])) => void;
  error: string;
  saveError: (data: string) => void;
  editName: number | null;
  saveEditName: (data: number | null) => void;
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
  const [filters, setFilters] = useState<Filter[]>([]);
  const [rows, setRows] = useState<RowItem[]>(INITIAL_LISTINGS);
  const [error, setError] = useState<string>('');
  const [editName, setEditName] = useState<number | null>(null);

  const saveFilters = (data: Filter[]) => {
    setFilters(data);
  }

  const saveRows = (updater: RowItem[] | ((prevRows: RowItem[]) => RowItem[])) => {
    if (typeof updater === 'function') {
      setRows((prevRows) => updater(prevRows));
    } else {
      setRows(updater);
    }
  };

  const saveError = (data: string) => {
    setError(data);
  };

  const saveEditName = (data: number | null) => {
    setEditName(data);
  };

  const resetOptions = (): void => {
    setRows(INITIAL_LISTINGS);
    setError('');
    setEditName(null);
  };

  const value: UploadContextProps = {
    filters,
    saveFilters,
    rows,
    saveRows,
    error,
    saveError,
    editName,
    saveEditName,
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