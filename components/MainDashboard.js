import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icons

const MainDashboard = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(backgroundAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(backgroundAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const navigateToStudexPortal = () => {
    navigation.navigate('StudexDashboard');
  };

  const navigateToBirthdays = () => {
    navigation.navigate('Birthday');
  };

  const navigateToSearchStudex = () => {
    navigation.navigate('SearchStudex');
  };

  const handleLogout = async () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.background, { opacity: backgroundAnim }]} />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Welcome</Text>
          <Text style={[styles.headerTitle, { color: 'blueviolet', fontSize: 24 }]}>Shivam</Text>
        </View>
        <TouchableOpacity onPress={openModal}>
          <Image source={require('../assets/user.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
      <Image source={require('../assets/hero.jpg')} style={styles.contentImage} resizeMode="cover" />
      </View>
      <Animated.View style={[styles.navBar, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToStudexPortal}>
          <Icon name="dashboard" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={navigateToBirthdays}>
          <Icon name="birthday-cake" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={navigateToSearchStudex}>
          <Icon name="search" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
          <Icon name="sign-out" size={26} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, { opacity: backgroundAnim }]}>
            <Image source={require('../assets/user.jpg')} style={styles.largeImage} />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000428',
    padding: 10,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  contentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 7,
    borderRadius: 10,
  },
  navButton: {
    padding: 10,
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  largeImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blueviolet',
    borderRadius: 7,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MainDashboard;
