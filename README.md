# Aplicativo Mobile - Papelaria Candy

Aplicativo mobile desenvolvido em **React Native com Expo** para a disciplina de Tecnologias Móveis e Híbridas. Este app consome a API `gestao-papelaria-api` (Spring Boot) para realizar o gerenciamento de produtos de uma papelaria.

O projeto cumpre os requisitos do trabalho, implementando:
* **CRUD** (Cadastrar, Listar, Editar, Excluir).
* **Navegação por Abas (Tab Navigation):** Para as telas principais (Home, Produtos, Cadastrar).
* **Navegação por Pilha (Stack Navigation):** Para o fluxo de CRUD (ex: clicar em um item para editar).

## ✨ Funcionalidades

* **Listagem de Produtos (GET):** Busca e exibe os produtos da API em uma `FlatList` com atualização automática (`useFocusEffect`).
* **Cadastro de Produtos (POST):** Formulário em uma tela de "stack" com `Picker` para carregar as categorias.
* **Edição de Produtos (PUT & GET by ID):** Tela de "stack" que busca dados do produto pelo ID e preenche o formulário.
* **Exclusão de Produtos (DELETE):** Botão com validação/confirmação (`window.confirm` ou `Alert.alert`) na tela de edição.
* **Navegação Avançada:** Uso de **Expo Router** para gerenciar as rotas de abas e pilha.

## 🛠️ Tecnologias Utilizadas

* **React Native**
* **Expo (SDK 50+)**
* **Expo Router** (Navegação baseada em arquivos)
* **Axios** (Requisições HTTP)
* **@react-native-picker/picker**

---

## 🚀 Como Executar o Projeto

**Este projeto é um front-end e depende do back-end (API) para funcionar.** Siga os dois passos abaixo:

### 1. (Pré-requisito) Rodando o Back-end (API)

1.  Clone o repositório da API:
    ```bash
    git clone [https://github.com/NataniMoraes/gestao-papelaria-api.git](https://github.com/NataniMoraes/gestao-papelaria-api.git)
    cd gestao-papelaria-api
    ```

2.  **Configure o Banco de Dados:**
    * Crie um banco MySQL chamado `gestao_papelaria`.
    * Abra o arquivo `src/main/resources/application.properties` e configure seu usuário e senha do MySQL.
    * (Opcional) Execute o script `data-load-script.sql` (incluído na raiz da API) para popular o banco com dados.

3.  Rode a API:
    ```bash
    mvn spring-boot:run
    ```

4.  **A API deve estar rodando em `http://localhost:8080`.** Mantenha este terminal aberto.

### 2. Rodando o App Mobile (Este Projeto)

1.  Abra um **novo terminal**.
2.  Clone este repositório:
    ```bash
    git clone [https://github.com/NataniMoraes/papelaria-candy-mobile.git](https://github.com/NataniMoraes/papelaria-candy-mobile.git)
    cd papelaria-candy-mobile
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

4.  Rode o projeto:
    ```bash
    npm start
    ```

5.  O terminal mostrará um QR Code.
    * **Para o celular:** Baixe o app **Expo Go** (Android/iOS) e escaneie o QR Code.
    * **Para o navegador:** Aperte `w` no terminal para abrir no seu navegador.

> **Nota de Teste:** Ao rodar no navegador, você pode inspecionar as chamadas de API nas **Ferramentas de Desenvolvedor** (tecla `F12`) na aba **"Rede" (Network)**.
