import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Alert, ScrollView, View, Platform } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { Picker } from '@react-native-picker/picker';

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidadeEstoque: '',
    codigoBarras: '',
    categoriaId: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduto = axios.get(`http://localhost:8080/produtos/${id}`);
    const fetchCategorias = axios.get('http://localhost:8080/categorias');

    Promise.all([fetchProduto, fetchCategorias])
      .then(([produtoResponse, categoriaResponse]) => {
        const produto = produtoResponse.data;
        setFormData({
          nome: produto.nome || '',
          descricao: produto.descricao || '',
          preco: produto.preco?.toString() || '',
          quantidadeEstoque: produto.quantidadeEstoque?.toString() || '',
          codigoBarras: produto.codigoBarras || '',
          categoriaId: produto.categoria?.id || '',
        });

        setCategorias(categoriaResponse.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.preco || !formData.quantidadeEstoque || !formData.categoriaId) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios (*) antes de salvar.');
      return;
    }

    axios.put(`http://localhost:8080/produtos/${id}`, formData)
      .then(() => {
        Alert.alert('Sucesso!', 'Produto atualizado com sucesso.');
        router.back();
      })
      .catch(error => {
        console.error('Erro ao atualizar produto:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o produto.');
      });
  };

  const handleDelete = () => {
    const confirmacao =
      Platform.OS === 'web'
        ? window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')
        : true; // Em mobile, vamos direto para a exclusão

    if (!confirmacao) return;

    axios.delete(`http://localhost:8080/produtos/${id}`)
      .then(() => {
        Alert.alert('Sucesso!', 'Produto excluído.');
        router.back();
      })
      .catch(error => {
        console.error('Erro ao excluir produto:', error);
        Alert.alert('Erro', 'Não foi possível excluir o produto.');
      });
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Editar Produto
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Nome do Produto *"
          value={formData.nome}
          onChangeText={text => handleChange('nome', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={formData.descricao}
          onChangeText={text => handleChange('descricao', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço *"
          value={formData.preco}
          onChangeText={text => handleChange('preco', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade em Estoque *"
          value={formData.quantidadeEstoque}
          onChangeText={text => handleChange('quantidadeEstoque', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Código de Barras *"
          value={formData.codigoBarras}
          onChangeText={text => handleChange('codigoBarras', text)}
        />

        <ThemedText style={styles.label}>Categoria *</ThemedText>
        <Picker
          selectedValue={formData.categoriaId}
          style={styles.picker}
          onValueChange={value => handleChange('categoriaId', value)}
        >
          <Picker.Item label="Selecione uma categoria..." value="" />
          {categorias.map(c => (
            <Picker.Item key={c.id} label={c.nome} value={c.id} />
          ))}
        </Picker>

        <Button title="Salvar Alterações" onPress={handleSubmit} color="#6200ee" />

        <View style={{ height: 16 }} />

        <Button title="Excluir Produto" onPress={handleDelete} color="#D32F2F" />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
