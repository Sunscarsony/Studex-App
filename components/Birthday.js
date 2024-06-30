import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Birthday = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [isTokenFetched, setIsTokenFetched] = useState(false);

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
    const response = await fetch('https://shivam.echotratech.com/api/2026/birthday/', {
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
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const imageUrl = `https://erp.psit.ac.in/assets/img/Simages/${item.id}.jpg`;

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.studentImage}
          resizeMode="cover"
        />
        <Text style={styles.cardText}>Name: {item.name}</Text>
        <Text style={styles.cardText}>Roll Number: {item.RollNo}</Text>
        <Text style={styles.cardText}>ID: {item.id}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Studex Dashboard</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.modal}>
        <View style={styles.modalContent}>
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000428',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
  },
  studentImageModal: {
    width: 150,
    height: 150,
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

export default Birthday;
