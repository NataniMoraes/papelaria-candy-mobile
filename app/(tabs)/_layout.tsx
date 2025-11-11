import { Tabs } from 'expo-router';
// Vamos usar o pacote de ícones que já vem com o template
import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index" // Refere-se ao arquivo index.tsx
        options={{
          title: 'Home', // O texto da aba
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="produtos" // Refere-se ao arquivo produtos.tsx
        options={{
          title: 'Produtos', // O texto da aba
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}