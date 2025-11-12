import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    // O <Stack> é o navegador de "pilha" que controla as telas
    <Stack>
      
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} // Esconde o cabeçalho duplicado
      />

      <Stack.Screen 
        name="cadastro" // Refere-se ao arquivo app/cadastro.tsx
        options={{
          title: 'Cadastrar Novo Produto',
        }}
      />

      <Stack.Screen 
        name="detalhes" // Refere-se ao arquivo app/detalhes.tsx
        options={{
          title: 'Editar Produto', 
          headerBackTitle: 'Voltar',
        }}
      />

    </Stack>
  );
}