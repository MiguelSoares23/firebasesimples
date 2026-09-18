import { View, Text, StyleSheet } from "react-native";

export default function Home() {

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        BIBLIOTECA
      </Text>

      <Text style={styles.subtitulo}>
        Conexão Suassuna
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#9BC383",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#165900"
  },

  subtitulo: {
    fontSize: 20,
    marginTop: 10,
    color: "#000"
  }

});