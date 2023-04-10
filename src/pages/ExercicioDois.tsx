import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function ExercicioDois() {
  const [listaUm, setListaUm] = useState("");
  const [listaDois, setListaDois] = useState("");
  const [result, setResult] = useState({});

  const handleClick = () => {
    try {
      const obj1 = JSON.parse(listaUm.replace(/\s+/g, ""));
      const obj2 = JSON.parse(listaDois.replace(/\s+/g, ""));
      for (let prop in obj1) {
        if (obj2.hasOwnProperty(prop)) {
          obj1[prop] = obj2[prop];
        }
      }
      setResult(obj1);
      console.info("Objeto modificado", JSON.stringify(obj1));
    } catch (error) {
      console.error('Error -> ', error);
      alert('Verifique se os dados inseridos estão em um formato de json correto. \n Utilize esse site para verificar: https://jsonformatter.curiousconcept.com')
    }
  };
  return (
    <>
      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <TextField
          required
          id="outlined-required"
          label="Required"
          onChange={(event) => setListaUm(event.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          onChange={(event) => setListaDois(event.target.value)}
        />
        <Button variant="outlined" onClick={() => handleClick()}>
          Atualizar a lista
        </Button>
      </div>
      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        {JSON.stringify(result) !== "{}" && <h4>{JSON.stringify(result)}</h4>}
      </div>
    </>
  );
}
