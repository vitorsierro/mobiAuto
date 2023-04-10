
import { useFipeContext } from "../../contextApi/fipe-context";
import Typography from '@mui/material/Typography';
import styled from "../../styles/FipeTable.module.css";

export default function ModalSuccecs() {
    const {dados} = useFipeContext()
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