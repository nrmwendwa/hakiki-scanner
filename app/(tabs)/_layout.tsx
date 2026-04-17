import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { 
  Home, 
  Scan, 
  Sparkles, 
  Info,
  LucideIcon 
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface TabIconProps {
  Icon: LucideIcon;
  focused: boolean;
  label: string;
}

function TabIcon({ Icon, focused, label }: TabIconProps) {
  return (
    <View style={styles.tabIconWrapper}>
      <View style={[styles.tabIconInner, focused && styles.tabIconActive]}>
        <Icon
          size={20}
          color={focused ? Colors.primary : Colors.textSecondary}
          strokeWidth={focused ? 2.5 : 2}
        />
      </View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Nyumbani',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              Icon={Home}
              focused={focused}
              label="Nyumbani"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ focused }) => (
            <View style={styles.scannerTabWrap}>
              <View style={[styles.scannerTabBtn, focused && styles.scannerTabBtnActive]}>
                <Scan
                  size={26}
                  color={Colors.background}
                  strokeWidth={2.5}
                />
              </View>
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
                Scanner
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="features"
        options={{
          title: 'Vipengele',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              Icon={Sparkles}
              focused={focused}
              label="Vipengele"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Kuhusu',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              Icon={Info}
              focused={focused}
              label="Kuhusu"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.backgroundAlt,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: Platform.OS === 'ios' ? 88 : 74,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
    paddingTop: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabIconWrapper: {
    alignItems: 'center',
    gap: 4,
    width: 64,
  },
  tabIconInner: {
    width: 40,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: Colors.primaryBg,
  },
  tabLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  // Scanner center elevated button
  scannerTabWrap: {
    alignItems: 'center',
    gap: 4,
    marginTop: -16,
  },
  scannerTabBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.textTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 4,
    borderColor: Colors.backgroundAlt,
  },
  scannerTabBtnActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
});
