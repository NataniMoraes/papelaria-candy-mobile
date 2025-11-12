import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons'; // Para os ícones

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Papelaria Candy</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>Painel de Controle</ThemedText>

      {/* Grid de Botões */}
      <ThemedView style={styles.grid}>
        
        {/* Botão 1: Listar Produtos */}
        <Link href="/produtos" asChild>
          <Pressable style={styles.button}>
            <Ionicons name="list" size={32} color="#fff" />
            <ThemedText style={styles.buttonText}>Ver Produtos</ThemedText>
          </Pressable>
        </Link>

        {/* Botão 2: Cadastrar Produto */}
        <Link href="/cadastro" asChild>
          <Pressable style={styles.button}>
            <Ionicons name="add" size={32} color="#fff" />
            <ThemedText style={styles.buttonText}>Novo Produto</ThemedText>
          </Pressable>
        </Link>
        
        {/* Adicione mais botões conforme criamos as telas */}
        {/*
        <Link href="/categorias" asChild>
          <Pressable style={styles.button}>
            <Ionicons name="albums" size={32} color="#fff" />
            <ThemedText style={styles.buttonText}>Categorias</ThemedText>
          </Pressable>
        </Link>
        */}

      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40, // Mais espaço no topo
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centraliza os botões
    gap: 16, // Espaço entre os botões
  },
  button: {
    backgroundColor: '#6200ee', // O mesmo roxo do outro botão
    borderRadius: 12,
    padding: 20,
    width: 150, // Largura fixa
    height: 120, // Altura fixa
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});