import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

export default function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        alert("Erro: " + error.message);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Login</Text>

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

      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={() => router.push("/telacadastro")} />
    </View>
  );
}