import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

export default function TelaCadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleCadastro = () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert("Usuário criado!");
        router.push("/telalogin");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#fdfada" }}>
      <Text style={{ fontSize: 20 }}>Cadastro</Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}