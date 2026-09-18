import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions
} from "react-native";

import { auth, db } from "../firebaseConfig";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { useRouter } from "expo-router";

export default function TelaLogin() {

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const { width } = useWindowDimensions();

  const handleLogin = async () => {

    if (!matricula || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {

      // Procura a matrícula no Firestore
      const consulta = query(
        collection(db, "usuarios"),
        where("matricula", "==", matricula)
      );

      const resultado = await getDocs(consulta);

      if (resultado.empty) {
        alert("Matrícula não encontrada.");
        return;
      }

      // Pega os dados encontrados
      const dadosUsuario = resultado.docs[0].data();

      // Faz login usando o e-mail encontrado
      await signInWithEmailAndPassword(
        auth,
        dadosUsuario.email,
        senha
      );

      router.replace("/home");

    } catch (error) {

      console.log(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Matrícula ou senha incorreta.");
      } else {
        alert("Erro ao realizar login.");
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      <View
        style={[
          styles.conteudo,
          {
            flexDirection: width > 700 ? "row" : "column"
          }
        ]}
      >

        {/* LOGO */}

        <View style={styles.areaLogo}>

          <View style={styles.logo}>
            <Text style={styles.logoTexto}>
              LOGO
            </Text>
          </View>

        </View>

        {/* LOGIN */}

        <View style={styles.formulario}>

          <Text style={styles.titulo}>
            LOGIN
          </Text>

          <Text style={styles.label}>
            Matrícula:
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua matrícula"
            placeholderTextColor="#ffffff"
            value={matricula}
            onChangeText={setMatricula}
          />

          <Text style={styles.label}>
            Senha:
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#ffffff"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Pressable
            style={styles.botao}
            onPress={handleLogin}
          >
            <Text style={styles.textoBotao}>
              ENTRAR
            </Text>

            <Text style={styles.seta}>
              →
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/telacadastro")}
          >
            <Text style={styles.cadastro}>
              Ainda não possui cadastro? Cadastre-se
            </Text>
          </Pressable>

        </View>

      </View>

      <View style={styles.rodape} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#9BC383"
  },

  conteudo: {
    flex: 1,
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    gap: 40
  },

  areaLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  logo: {
    width: 190,
    height: 240,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },

  logoTexto: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000"
  },

  formulario: {
    width: "100%",
    maxWidth: 500,
    flex: 1,
    justifyContent: "center"
  },

  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 30
  },

  label: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
    marginBottom: 6
  },

  input: {
    height: 48,
    borderWidth: 2,
    borderColor: "#47732E",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#fff"
  },

  botao: {
    backgroundColor: "#165900",
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline"
  },

  seta: {
    color: "#fff",
    fontSize: 25
  },

  cadastro: {
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
    color: "#165900",
    fontWeight: "bold"
  },

  rodape: {
    height: 60,
    width: "100%",
    backgroundColor: "#165900"
  }

});