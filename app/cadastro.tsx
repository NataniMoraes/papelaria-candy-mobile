import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Para navegar de volta
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Picker } from '@react-native-picker/picker'; // 1. Importar o Picker

export default function CadastroScreen() {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidadeEstoque: '',
    codigoBarras: '',
    categoriaId: '',
  });

  const [categorias, setCategorias] = useState([]);
  const router = useRouter(); // Hook para navegação

  // 2. Busca as categorias da API quando a tela carrega
  useEffect(() => {
    axios.get('http://localhost:8080/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
      });
  }, []);

  // 3. Função para atualizar o estado do formulário
  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 4. Função para enviar o formulário
  const handleSubmit = () => {
    // Validação simples
    if (!formData.nome || !formData.preco || !formData.categoriaId) {
      Alert.alert("Erro", "Por favor, preencha os campos obrigatórios (Nome, Preço, Categoria).");
      return;
    }

    axios.post('http://localhost:8080/produtos', formData)
      .then(response => {
        Alert.alert("Sucesso!", "Produto cadastrado.");
        router.back(); // Navega de volta para a tela anterior (a lista)
      })
      .catch(error => {
        console.error("Erro ao cadastrar produto:", error);
        Alert.alert("Erro", "Não foi possível cadastrar o produto.");
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Cadastrar Novo Produto</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto *"
        value={formData.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={formData.descricao}
        onChangeText={(text) => handleChange('descricao', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço (ex: 25.50) *"
        value={formData.preco}
        onChangeText={(text) => handleChange('preco', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade em Estoque *"
        value={formData.quantidadeEstoque}
        onChangeText={(text) => handleChange('quantidadeEstoque', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Código de Barras *"
        value={formData.codigoBarras}
        onChangeText={(text) => handleChange('codigoBarras', text)}
      />

      <ThemedText style={styles.label}>Categoria *</ThemedText>
      <Picker
        selectedValue={formData.categoriaId}
        style={styles.picker}
        onValueChange={(itemValue) => handleChange('categoriaId', itemValue)}
      >
        <Picker.Item label="Selecione uma categoria..." value="" />
        {categorias.map(categoria => (
          <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
        ))}
      </Picker>

      <Button title="Salvar Produto" onPress={handleSubmit} color="#6200ee" />
    </ThemedView>
  );
}

// 5. Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    // Estilos para o tema escuro podem não ser ideais, mas é funcional
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