import { Tabs, Redirect } from 'expo-router'; // 1. Importar Redirect
import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index" // Tela: app/(tabs)/index.tsx
        options={{
          title: 'Home', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      {/* --- BOTÃO DE CADASTRO NO MEIO --- */}
      <Tabs.Screen
        name="cadastroRedirect" // Nome falso, apenas para o menu
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          // Ao pressionar a aba
          tabPress: (e) => {
            e.preventDefault(); // Impede a navegação padrão
            // Navega para a tela de stack
            navigation.navigate('cadastro'); 
          },
        })}
      />
      {/* ---------------------------------- */}

      <Tabs.Screen
        name="produtos" // Tela: app/(tabs)/produtos.tsx
        options={{
          title: 'Produtos', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}