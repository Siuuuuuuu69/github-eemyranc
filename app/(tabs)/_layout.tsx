import { Tabs } from 'expo-router';
import { User, Chrome as Home, Plane, SquareCheck as CheckSquare, Crown, FileText } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="conditions"
        options={{
          title: 'Conditions',
          tabBarIcon: ({ size, color }) => (
            <FileText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flights"
        options={{
          title: 'Vols',
          tabBarIcon: ({ size, color }) => (
            <Plane size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: 'Checklist',
          tabBarIcon: ({ size, color }) => (
            <CheckSquare size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          title: 'Premium',
          tabBarIcon: ({ size, color }) => (
            <Crown size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}