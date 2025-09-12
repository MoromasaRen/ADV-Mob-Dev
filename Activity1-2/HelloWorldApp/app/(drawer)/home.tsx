import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const SONG_CARD_SIZE = width * 0.4; // for trending songs
const ARTIST_CARD_SIZE = 100; // round artist picture
const ALBUM_CARD_SIZE = width * 0.6; // album covers

// Fake data
const TRENDING_SONGS = [
  { id: "1", title: "Song One", artist: "Artist A", image: "https://i.scdn.co/image/ab67616d0000b273c0c2e5.jpg" },
  { id: "2", title: "Song Two", artist: "Artist B", image: "https://i.scdn.co/image/ab67616d0000b27398b2d7.jpg" },
];
const POPULAR_ARTISTS = [
  { id: "1", name: "Artist A", image: "https://i.scdn.co/image/ab6761610000e5eb3efc6.jpg" },
  { id: "2", name: "Artist B", image: "https://i.scdn.co/image/ab6761610000e5eb71234.jpg" },
];
const ALBUMS = [
  { id: "1", title: "Album One", image: "https://i.scdn.co/image/ab67616d0000b273abcdef.jpg" },
  { id: "2", title: "Album Two", image: "https://i.scdn.co/image/ab67616d0000b273fedcba.jpg" },
];

// Custom Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#121212" }}>
      <DrawerItem
        label="Home"
        labelStyle={{ color: "#fff" }}
        onPress={() => props.navigation.navigate("Home")}
        icon={() => <Ionicons name="home-outline" size={22} color="#fff" />}
      />
      <DrawerItem
        label="Profile"
        labelStyle={{ color: "#fff" }}
        onPress={() => props.navigation.navigate("Profile")}
        icon={() => <Ionicons name="person-outline" size={22} color="#fff" />}
      />
      <DrawerItem
        label="Settings"
        labelStyle={{ color: "#fff" }}
        onPress={() => props.navigation.navigate("Settings")}
        icon={() => <Ionicons name="settings-outline" size={22} color="#fff" />}
      />
    </DrawerContentScrollView>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const pulse = useRef(new Animated.Value(1)).current;

  const renderSong = ({ item }) => (
    <View style={styles.songCard}>
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <Text style={styles.songTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.songArtist} numberOfLines={1}>
        {item.artist}
      </Text>
    </View>
  );

  const renderArtist = ({ item }) => (
    <View style={styles.artistCard}>
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <Text style={styles.artistName} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  const renderAlbum = ({ item }) => (
    <View style={styles.albumCard}>
      <Image source={{ uri: item.image }} style={styles.albumImage} />
      <Text style={styles.albumTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.h1}>Good evening</Text>
          <TouchableOpacity>
            <Ionicons name="person-circle" size={40} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color="#b3b3b3" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#b3b3b3"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Trending Songs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending songs</Text>
          <TouchableOpacity>
            <Text style={styles.showAll}>Show all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={TRENDING_SONGS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderSong}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingLeft: 16 }}
        />

        {/* Popular Artists */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular artists</Text>
          <TouchableOpacity>
            <Text style={styles.showAll}>Show all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={POPULAR_ARTISTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderArtist}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingLeft: 16 }}
        />

        {/* Albums */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular albums</Text>
          <TouchableOpacity>
            <Text style={styles.showAll}>Show all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ALBUMS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderAlbum}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingLeft: 16 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Profile & Settings placeholders
function ProfileScreen() {
  return (
    <View style={styles.center}>
      <Text style={{ color: "#fff" }}>Profile Screen</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={styles.center}>
      <Text style={{ color: "#fff" }}>Settings Screen</Text>
    </View>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: "#121212", width: 240 },
          overlayColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  h1: { color: "#fff", fontSize: 22, fontWeight: "700" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 44,
  },
  searchInput: { marginLeft: 8, color: "#fff", flex: 1 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  showAll: { color: "#b3b3b3", fontSize: 13 },

  songCard: { width: SONG_CARD_SIZE, marginRight: 14 },
  songImage: { width: "100%", height: SONG_CARD_SIZE, borderRadius: 6 },
  songTitle: { color: "#fff", marginTop: 6, fontWeight: "500" },
  songArtist: { color: "#b3b3b3", fontSize: 12 },

  artistCard: { width: ARTIST_CARD_SIZE, marginRight: 16, alignItems: "center" },
  artistImage: {
    width: ARTIST_CARD_SIZE,
    height: ARTIST_CARD_SIZE,
    borderRadius: ARTIST_CARD_SIZE / 2,
    marginBottom: 6,
  },
  artistName: { color: "#fff", fontSize: 13, textAlign: "center" },

  albumCard: { width: ALBUM_CARD_SIZE, marginRight: 16 },
  albumImage: { width: "100%", height: ALBUM_CARD_SIZE, borderRadius: 8 },
  albumTitle: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "600",
    fontSize: 14,
  },

  center: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
});
