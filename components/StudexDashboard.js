import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, SafeAreaView, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudexDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [isTokenFetched, setIsTokenFetched] = useState(false);
  const cardScale = useState(new Animated.Value(1))[0];
  const modalOpacity = useState(new Animated.Value(0))[0];
  const modalScale = useState(new Animated.Value(0.8))[0];

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('access_token');
      setToken(storedToken);
      setIsTokenFetched(true);
    };
    getToken();
  }, []);

  const fetchStudents = async () => {
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetch('https://shivam.echotratech.com/api/2026/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data: students, isLoading, isError } = useQuery('students', fetchStudents, {
    enabled: isTokenFetched && !!token, // only run the query if the token is fetched and available
  });

  const handleCardPress = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.spring(modalScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalVisible(false);
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.spring(modalScale, {
      toValue: 0.8,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => {
    const imageUrl = `https://erp.psit.ac.in/assets/img/Simages/${item.id}.jpg`;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(item)}
        onPressIn={() => {
          Animated.spring(cardScale, {
            toValue: 0.95,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(cardScale, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }}
      >
        <Animated.View style={{ transform: [{ scale: cardScale }] }}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.studentImage}
            resizeMode="cover"
          />
          <Text style={styles.cardText}>Name: {item.name}</Text>
          <Text style={styles.cardText}>Roll Number: {item.RollNo}</Text>
          <Text style={styles.cardText}>ID: {item.id}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data.</Text>;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Studex <Text style={{color:'blueviolet'}}>Dashboard</Text></Text>
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          numColumns={2}
        />
        <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.modal}>
          <Animated.View style={[styles.modalContent, { opacity: modalOpacity, transform: [{ scale: modalScale }] }]}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Student Details</Text>
            {selectedStudent && (
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image
                  source={{ uri: `https://erp.psit.ac.in/assets/img/Simages/${selectedStudent.id}.jpg` }}
                  style={styles.studentImageModal}
                />
                <Text style={styles.modalText}>Name: {selectedStudent.name}</Text>
                <Text style={styles.modalText}>Father's Name: {selectedStudent.FatherName}</Text>
                <Text style={styles.modalText}>Mother's Name: {selectedStudent.MotherName}</Text>
                <Text style={styles.modalText}>Address: {selectedStudent.ADDRESS}</Text>
                <Text style={styles.modalText}>Mobile: {selectedStudent.MOBILE}</Text>
                <Text style={styles.modalText}>Email: {selectedStudent.EMAIL}</Text>
                <Text style={styles.modalText}>Date of Birth: {selectedStudent.dob}</Text>
                <Text style={styles.modalText}>Gender: {selectedStudent.GENDER}</Text>
                <Text style={styles.modalText}>Section: {selectedStudent.Section}</Text>
                <Text style={styles.modalText}>Branch: {selectedStudent.BRANCH}</Text>
                <Text style={styles.modalText}>Roll Number: {selectedStudent.RollNo}</Text>
                <Text style={styles.modalText}>ID: {selectedStudent.id}</Text>
                <Text style={styles.modalText}>Percentage: {selectedStudent.PERCENTAGE}</Text>
              </ScrollView>
            )}
          </Animated.View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#222831',
  },
  container: {
    flex: 1,
    backgroundColor: '#000428',
    padding: 10,
  },
  title: {
    margin:10,
    fontSize: 36,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  list: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    width: '45%',
    margin: '2.5%',
    elevation: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContent: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  studentImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'center',
    borderColor: 'blueviolet',
  },
  studentImageModal: {
    width: 150,
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default StudexDashboard;
