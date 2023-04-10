import axios from "axios";
import Image from "next/image";
import { Fragment, Key, useEffect, useState } from "react";

const translate = require('translate');

translate.engine = "google";
translate.key = process.env.GOOGLE_KEY;

type data = {
  name: string;
  gender: string;
  image: string;
  species: string;
};

type newData = {
  nome: string;
  genero: string;
  avatar: string;
  especie: string;
};

function ExercicioTres() {
  const [dados, setDados] = useState<newData[]>([]);
  const [data, setData] = useState<data[]>([]);
  const translateText = async (text: string) => {
    try {
      const response = await translate(text, "pt");
      return response;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const translateData = async (data: data[]) => {
    const newData: newData[] = await Promise.all(
      data.map(async (element: data) => {
        const [genero, especie] = await Promise.all([
          translateText(element.gender),
          translateText(element.species),
        ]);
        return {
          nome: element.name,
          genero,
          avatar: element.image,
          especie,
        };
      })
    );
    return newData;
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character/1,2,3,4,5"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  
  useEffect(() => {
    translateData(data).then((res) => setDados(res));
    console.info(dados);
  }, [data]);

  return (
    <div
      style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap" }}
    >
      {dados?.map((item: any, key: Key) => (
        <Fragment key={key}>
          <div style={{maxWidth:'320px', margin:'0rem 3rem 1rem'}}>
            <Image src={item.avatar} alt={item.nome}  width={320} height={320} quality={100}/>
            <div>
              <h2>Nome: {item.nome}</h2>
              <h2>Genero: {item.genero}</h2>
              <h2>Especie: {item.especie}</h2>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default ExercicioTres;
