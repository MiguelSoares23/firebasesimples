import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

export default function Home() {
  const [usd, setUsd] = useState(null);
  const [eur, setEur] = useState(null);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarCotacao = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://economia.awesomeapi.com.br/json/all");
      const dados = await response.json();

      setUsd(parseFloat(dados.USD.bid).toFixed(2));
      setEur(parseFloat(dados.EUR.bid).toFixed(2));

      const agora = new Date();
      setData(agora.toLocaleString());

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    buscarCotacao();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Cotação de Moedas</Text>
      <Text>Atualizado em: {data}</Text>

      <View style={{ marginTop: 20 }}>
        <Text>USD/BRL: R$ {usd || "..."}</Text>
        <Text>EUR/BRL: R$ {eur || "..."}</Text>
      </View>

      <Button
        title={loading ? "Atualizando..." : "Atualizar Cotações"}
        onPress={buscarCotacao}
      />
    </View>
  );
}