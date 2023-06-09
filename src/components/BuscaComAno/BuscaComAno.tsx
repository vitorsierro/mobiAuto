import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Autocomplete, Button, TextField } from "@mui/material"
import styled from "../../styles/FipeTable.module.css"
import axios from "axios"
import { useFipeContext } from "../../contextApi/fipe-context";

type Marca = {
  codigo: string;
  nome: string;
};

type Modelo = {
  codigo: string;
  nome: string;
};

type Anos = {
  codigo: string;
  nome: string;
};

type Preco = {
  marca: string;
  modelo: string;
  ano: string
};

type Props = {
  setIsModal: Dispatch<SetStateAction<boolean>>
};

export default function BuscaComAno({  setIsModal  }: Props) {
  const {saveDados} = useFipeContext();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [anos, setAnos] = useState<Anos[]>([]);
  const [preco, setPreco] = useState<Preco>({ marca: "", modelo: "", ano: "" })

  useEffect(() => {
    const fetchMarcas = async () => {
      const res = await axios.get(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );
      setMarcas(res.data);
    };
    fetchMarcas();
  }, []);

  const handleMarcaChange = (_: any, value: string | null) => {
    if (value) {
      const marca = marcas.find((item) => item.nome === value);
      setPreco((preco) => ({ ...preco, marca: marca?.codigo || "" }));

      const fetchModelos = async () => {
        const res = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${
            marca?.codigo || ""
          }/modelos`
        );
        setModelos(res.data.modelos);
      };
      fetchModelos();
    }
  };

  const handleModeloChange = (_: any, value: string | null) => {
    if (value) {
      const modelo = modelos.find((item) => item.nome === value)
      setPreco((preco) => ({ ...preco, modelo: modelo?.codigo || "" }))
      
      const fetchAnos = async () => {
        const res = await axios.get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${
            preco.marca || ""
          }/modelos/${modelo?.codigo || ""}/anos`
        )
        setAnos(res.data)

      }
      fetchAnos()
    }
  }
  const handleAnosChange = (_: any, value: string | null) => {
    if (value) {
      const ano = anos.find((item) => item.nome === value)
      setPreco((preco) => ({ ...preco, ano: ano?.codigo || "" }))
    }
  }
  const handleClick = () => {
    const fetchPrice = async () => {
      const res = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${
          preco.marca || "0"
        }/modelos/${preco.modelo || "0"}/anos/${preco.ano}`
      ).then((res) => saveDados(res.data)).then(() => setIsModal(true))
      
  }
  fetchPrice()
  }

  const isConsultarPrecoDisabled = !preco.marca || !preco.modelo

  return (
    <>
      <h1>Busca Com Ano</h1>
      <main>
        <Autocomplete
          disablePortal
          className={styled.selectedBox}
          options={marcas.map((marca) => marca.nome)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Marca" />}
          onChange={handleMarcaChange}
        />
        <Autocomplete
          disablePortal
          className={styled.selectedBox}
          options={modelos.map((modelo) => modelo.nome)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Modelo" />}
          onChange={handleModeloChange}
        />
        <Autocomplete
          disablePortal
          className={styled.selectedBox}
          options={anos.map((ano) => ano.nome)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Ano" />}
          onChange={handleAnosChange}
        />
        <Button
          variant="contained"
          onClick={() => handleClick()}
          disabled={isConsultarPrecoDisabled}
          sx={{ width: 300 }}
        >
          Consultar Preço
        </Button>
      </main>
    </>
  )
}