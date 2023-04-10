import { useState } from "react";
import BuscaComAno from "../components/BuscaComAno/BuscaComAno";
import BuscaSemAno from "../components/BuscaSemAno/BuscaSemAno";
import styled from "../styles/FipeTable.module.css";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

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

export default function FipeTable() {
  const [buscaAno, setBuscaAno] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [ dados, setDados ] = useState<data>();

  const ModalSuccecs = () => {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Tabela Fipe: Preço {dados?.Marca} {dados?.Modelo} {dados?.AnoModelo}
        </Typography>
        <label className={styled.label}>{dados?.Valor}</label>
        <Typography variant="subtitle1" gutterBottom>
     Este é o preço de compra do veículo</Typography>
      </>
    );
  };

  return (
    <div className={styled.fipeTable}>
      <header className={styled.header}>
        <ul className={styled.search}>
          <li className={styled.searchLink}>
            <Button
              variant="outlined"
              className={styled.searchButton}
              onClick={() => {setBuscaAno(false); setIsModal(false)}}
            >
              Busca sem ano
            </Button>
          </li>
          <li className={styled.searchLink}>
            <Button
              variant="outlined"
              className={styled.searchButton}
              onClick={() => {setBuscaAno(true);  setIsModal(false)}}
            >
              Busca com ano
            </Button>
          </li>
        </ul>
      </header>
      <main className={styled.mainConteudo}>
        {!isModal ? (
          <div>
            {buscaAno ? (
              <BuscaComAno setDados={setDados} setIsModal={setIsModal} />
            ) : (
              <BuscaSemAno setDados={setDados} setIsModal={setIsModal} />
            )}
          </div>
        ) : (
          <div className={styled.modalSuccecs}>
            <ModalSuccecs />
          </div>
        )}
      </main>
    </div>
  );
}
