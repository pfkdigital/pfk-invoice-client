import React, { createContext, useContext, useState } from "react";

interface ClientPageContextValue {
    deleteMode: boolean;
    setDeleteMode: (mode: boolean) => void;
    selectedClientId: string | null;
    setSelectedClientId: (id: string | null) => void;
}

const ClientPageContext = createContext<ClientPageContextValue | undefined>(undefined);

export const ClientPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

    return (
        <ClientPageContext.Provider value={{ deleteMode, setDeleteMode, selectedClientId, setSelectedClientId }}>
            {children}
        </ClientPageContext.Provider>
    );
};

export const useClientPageContext = (): ClientPageContextValue => {
    const context = useContext(ClientPageContext);
    if (!context) {
        throw new Error("useClientPageContext must be used within a ClientPageProvider");
    }
    return context;
};