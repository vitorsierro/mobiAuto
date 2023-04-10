import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function ExercicioQuatro() {
  const [value, setValue] = useState("");
  const [isMaiusculo, setIsMaiusculo] = useState(false);
  const handleClick = () => {
    if (/^[A-Z]/.test(value)) {
      setIsMaiusculo(true);
      console.info('A primeira letra é maiuscula', isMaiusculo);
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
          onChange={(event) => setValue(event.target.value)}
        />
        <Button variant="outlined" onClick={() => handleClick()}>
          Verificar Letra maiúsculo
        </Button>
      </div>
      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <h4>A primeira letra é maiuscula: {isMaiusculo.toString()}</h4>
      </div>
    </>
  );
}
