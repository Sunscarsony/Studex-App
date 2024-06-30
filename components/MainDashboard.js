import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MainDashboard = ({ navigation }) => {
  const navigateToStudexPortal = () => {
    // Navigate to Studex Portal screen
    navigation.navigate('StudexDashboard');
  };

  const navigateToBirthdays = () => {
    // Navigate to Birthdays screen
    navigation.navigate('Birthday');
  };

  const navigateToSearchStudex = () => {
    // Navigate to Search Studex screen
    navigation.navigate('SearchStudex');
  };

  const handleLogout = async () => {
    // Perform logout actions (clear tokens, navigate to login screen, etc.)
    // Example:
    // await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburger}>
          <Image source={require('../assets/splash.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Main Dashboard</Text>
      </View>
      <View style={styles.cardsContainer}>
        {/* Card 1: Studex Portal */}
        <TouchableOpacity style={styles.card} onPress={navigateToStudexPortal}>
          <Text style={styles.cardText}>Studex Portal</Text>
        </TouchableOpacity>

        {/* Card 2: Birthdays */}
        <TouchableOpacity style={styles.card} onPress={navigateToBirthdays}>
          <Text style={styles.cardText}>Birthdays</Text>
        </TouchableOpacity>

        {/* Card 3: Search Studex */}
        <TouchableOpacity style={styles.card} onPress={navigateToSearchStudex}>
          <Text style={styles.cardText}>Search Studex</Text>
        </TouchableOpacity>

        {/* Card 4: Logout */}
        <TouchableOpacity style={styles.card} onPress={handleLogout}>
          <Text style={styles.cardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b0082',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  hamburger: {
    marginRight: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MainDashboard;
