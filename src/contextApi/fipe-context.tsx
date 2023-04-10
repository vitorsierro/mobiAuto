import React, { useContext, createContext, FC, useState } from "react";

type data = {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
};
interface FipeContextProps {
    dados: data,
    saveDados: (dados: data) => void
  }
const FipeContext = createContext<FipeContextProps>({} as FipeContextProps);

export const FipeProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [dados, setDados] = useState<data>({
    TipoVeiculo: 0,
    Valor: '',
    Marca: '',
    Modelo: '',
    AnoModelo: 0,
    Combustivel: '',
    CodigoFipe: '',
    MesReferencia: '',
    SiglaCombustivel: '',
  });
  
  const saveDados = (dados: data) => {
      setDados(dados);
  }

  return (
    <FipeContext.Provider value={{ dados, saveDados }}>
      {children}
    </FipeContext.Provider>
  );
};

export const useFipeContext = () => {
  return useContext(FipeContext);
};