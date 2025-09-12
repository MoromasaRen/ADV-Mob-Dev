import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native"; // <- import

export default function SettingsScreen() {
  const navigation = useNavigation(); // <- hook for navigation
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleLogout = () => {
    console.log("Logout triggered");
  };

  const ToggleSwitch = ({ value, onChange }) => {
    const translateX = new Animated.Value(value ? 22 : 2);

    const toggle = () => {
      Animated.timing(translateX, {
        toValue: value ? 2 : 22,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onChange(!value);
    };

    return (
      <Pressable
        onPress={toggle}
        style={[
          styles.toggleTrack,
          { backgroundColor: value ? "#22C55E" : "#4B5563" },
        ]}
      >
        <Animated.View style={[styles.toggleCircle, { transform: [{ translateX }] }]} />
      </Pressable>
    );
  };

  return (
    <LinearGradient
      colors={["#000000", "#121212", "#242427ff"]}
      locations={[0, 0.7, 1]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="arrow-back" size={28} color="#1DB954" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Playback */}
        <BlurView intensity={50} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Playback</Text>
          <View style={styles.row}>
            <Text style={styles.label}>High Quality Audio</Text>
            <ToggleSwitch value={highQuality} onChange={setHighQuality} />
          </View>
        </BlurView>

        {/* Notifications */}
        <BlurView intensity={50} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Push Notifications</Text>
            <ToggleSwitch value={notifications} onChange={setNotifications} />
          </View>
        </BlurView>

        {/* Appearance */}
        <BlurView intensity={50} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Mode</Text>
            <ToggleSwitch value={darkMode} onChange={setDarkMode} />
          </View>
        </BlurView>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
