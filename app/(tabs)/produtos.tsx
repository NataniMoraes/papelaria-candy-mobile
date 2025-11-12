import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Pressable } from 'react-native'; // Importar FlatList
import axios from 'axios'; // Importar axios
import { Link, useFocusEffect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProdutosScreen() {
  
  const [produtos, setProdutos] = useState([]);

  useFocusEffect(
    useCallback(() => { // Esta função agora roda toda vez que a tela
      // volta a ficar em foco (ex: depois do cadastro)
      buscarProdutos();
    }, [])
  );

  // 4. Criar a função de busca separada
  const buscarProdutos = () => {
    axios.get('http://localhost:8080/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

  // 3. Modificar o renderItem para ser um link
  const renderItem = ({ item }) => (
    // O <Link> do Expo Router funciona como um wrapper
    <Link href={{ pathname: "/detalhes", params: { id: item.id } }} asChild>
      <Pressable>
        <ThemedView style={styles.itemContainer}>
          <ThemedText type="subtitle">{item.nome}</ThemedText>
          <ThemedText>Preço: R$ {item.preco}</ThemedText>
          <ThemedText>Estoque: {item.quantidadeEstoque}</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );

  return (
    <ThemedView style={styles.container}>
      
      {/* 2. Adicionar o Botão de Cadastrar Novo */}
      <Link href="/cadastro" style={styles.linkCadastro}>
        <ThemedText style={styles.linkCadastroText}>Cadastrar Novo Produto +</ThemedText>
      </Link>
      
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  linkCadastro: {
    backgroundColor: '#6200ee', // Um roxo
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  linkCadastroText: {
    color: '#ffffff', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
});