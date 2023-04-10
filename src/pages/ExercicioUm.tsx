import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function ExercicioUm() {
  const [values, setValues] = useState<string>("");

  const handleChange = (event: any) => {
    const value = event.target.value;
    const nome = value.replace(/./g, (match: string, index: number) => {
      if (index >= value.length - 4 || match.trim() === "") {
        return match;
      } else {
        return "*";
      }
    });
    setValues(nome);
    console.info('valor: ', values);
  };

  return (
    <div
      style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
    >
      <TextField
        required
        id="outlined-required"
        label="Required"
        value={values}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
}
