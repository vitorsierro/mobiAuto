import { useState } from "react";
import BuscaComAno from "../components/BuscaComAno/BuscaComAno";
import BuscaSemAno from "../components/BuscaSemAno/BuscaSemAno";
import styled from "../styles/FipeTable.module.css";
import Button from "@mui/material/Button";
import ModalSuccecs from "../components/Modal/ModalSuccecs";


export default function FipeTable() {
  const [buscaAno, setBuscaAno] = useState(false);
  const [isModal, setIsModal] = useState(false);



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
              <BuscaComAno setIsModal={setIsModal} />
            ) : (
              <BuscaSemAno setIsModal={setIsModal} />
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