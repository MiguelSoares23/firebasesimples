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

import { auth } from "../firebaseConfig";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import { useRouter } from "expo-router";

export default function TelaCadastro() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const { width } = useWindowDimensions();

  const handleCadastro = async () => {

    if (!email || !senha) {
      alert("Preencha o e-mail e a senha!");
      return;
    }

    try {

      const usuario = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      console.log("Usuário criado:", usuario.user.uid);

      alert("Firebase funcionando! Usuário criado com sucesso.");

      router.push("/telalogin");

    } catch (error) {

      console.log("Erro Firebase:", error);

      if (error.code === "auth/email-already-in-use") {

        alert("Esse e-mail já está cadastrado.");

      } else if (error.code === "auth/invalid-email") {

        alert("Digite um e-mail válido.");

      } else if (error.code === "auth/weak-password") {

        alert("A senha deve ter pelo menos 6 caracteres.");

      } else {

        alert("Erro no Firebase: " + error.message);
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


        {/* FORMULÁRIO */}

        <View style={styles.formulario}>

          <Text style={styles.titulo}>
            CADASTRO
          </Text>


          <Text style={styles.label}>
            Email:
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu Email"
            placeholderTextColor="#ffffff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />


          <Text style={styles.label}>
            Senha:
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Crie uma Senha"
            placeholderTextColor="#ffffff"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />


          {/* BOTÃO */}

          <Pressable
            style={styles.botao}
            onPress={handleCadastro}
          >

            <Text style={styles.textoBotao}>
              TESTAR FIREBASE
            </Text>

            <Text style={styles.seta}>
              →
            </Text>

          </Pressable>


          {/* VOLTAR PARA LOGIN */}

          <Pressable
            onPress={() => router.push("/telalogin")}
          >

            <Text style={styles.login}>
              Já possui uma conta? Entrar
            </Text>

          </Pressable>

        </View>

      </View>


      {/* RODAPÉ */}

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
    alignItems: "center",
    justifyContent: "center",
    flex: 1
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
    color: "#000",
    textAlign: "center",
    marginBottom: 25
  },


  label: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
    marginTop: 12,
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
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
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


  login: {
    textAlign: "center",
    marginTop: 20,
    color: "#165900",
    fontWeight: "bold",
    textDecorationLine: "underline"
  },


  rodape: {
    height: 60,
    backgroundColor: "#165900",
    width: "100%"
  }

});