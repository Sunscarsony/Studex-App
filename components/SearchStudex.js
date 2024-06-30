import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Button, Alert } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchStudex = () => {
  const [searchId, setSearchId] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
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

  const searchStudent = async () => {
    if (!searchId) {
      Alert.alert('Invalid Input', 'Please enter an ID to search.');
      return;
    }

    try {
      const response = await fetch(`https://shivam.echotratech.com/api/2026/${searchId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Student not found');
      }

      const studentData = await response.json();
      setSearchedStudent(studentData);
      setModalVisible(true); // Open modal to show search result
    } catch (error) {
      console.error('Search Error:', error);
      Alert.alert('Search Failed', 'Student not found.');
    }
  };

  const closeModal = () => {
    setSearchedStudent(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Student</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter Student ID"
          value={searchId}
          onChangeText={setSearchId}
          keyboardType="numeric"
        />
        <Button title="Search" onPress={searchStudent} />
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Student Details</Text>
          {searchedStudent && (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Image
                source={{ uri: `https://erp.psit.ac.in/assets/img/Simages/${searchedStudent.id}.jpg` }}
                style={styles.studentImageModal}
              />
              <Text style={styles.modalText}>Name: {searchedStudent.name}</Text>
              <Text style={styles.modalText}>Father's Name: {searchedStudent.FatherName}</Text>
              <Text style={styles.modalText}>Mother's Name: {searchedStudent.MotherName}</Text>
              <Text style={styles.modalText}>Address: {searchedStudent.ADDRESS}</Text>
              <Text style={styles.modalText}>Mobile: {searchedStudent.MOBILE}</Text>
              <Text style={styles.modalText}>Email: {searchedStudent.EMAIL}</Text>
              <Text style={styles.modalText}>Date of Birth: {searchedStudent.dob}</Text>
              <Text style={styles.modalText}>Gender: {searchedStudent.GENDER}</Text>
              <Text style={styles.modalText}>Section: {searchedStudent.Section}</Text>
              <Text style={styles.modalText}>Branch: {searchedStudent.BRANCH}</Text>
              <Text style={styles.modalText}>Roll Number: {searchedStudent.RollNo}</Text>
              <Text style={styles.modalText}>ID: {searchedStudent.id}</Text>
              <Text style={styles.modalText}>Percentage: {searchedStudent.PERCENTAGE}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    width: '70%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  studentImageModal: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
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
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default SearchStudex;
