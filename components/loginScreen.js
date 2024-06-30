import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Animated,
  Easing,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const imageAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const welcomeAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bouncing animation for the image
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnim, {
          toValue: -10,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: 10,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade-in animation for inputs and button
    Animated.stagger(500, [
      Animated.timing(inputAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();

    // Bounce animation for the welcome text
    Animated.spring(welcomeAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [imageAnim, inputAnim, buttonAnim, welcomeAnim]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://shivam.echotratech.com/api/token/",
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;
        await AsyncStorage.setItem("access_token", access);
        await AsyncStorage.setItem("refresh_token", refresh);

        navigation.navigate("MainDashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.status === 401) {
        Alert.alert("Login Failed", "Invalid username or password.");
      } else {
        Alert.alert(
          "Login Failed",
          "Something went wrong. Please try again later."
        );
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://shivam.echotratech.com/api/register/",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully. Please log in.");
        setIsLogin(true);
      } else {
        throw new Error("Sign-up failed");
      }
    } catch (error) {
      console.error("Sign-up Error:", error);
      Alert.alert(
        "Sign-up Failed",
        "Something went wrong. Please try again later."
      );
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    Animated.timing(formAnim, {
      toValue: isLogin ? 1 : 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require("../assets/login-hero.png")}
        style={[styles.image, { transform: [{ translateY: imageAnim }] }]}
      />
      <View style={styles.content}>
        <Animated.Text style={[styles.welcome, { transform: [{ scale: welcomeAnim }] }]}>
          {isLogin ? "Login" : "Sign Up"}
        </Animated.Text>
        <Animated.View style={[styles.formContainer, { opacity: inputAnim }]}>
          {!isLogin && (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#ccc"
            />
          )}
          <TextInput
            value={isLogin ? username : email}
            onChangeText={isLogin ? setUsername : setEmail}
            style={styles.input}
            placeholder={isLogin ? "Username" : "Email"}
            placeholderTextColor="#ccc"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#ccc"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleSignUp}>
            <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ opacity: buttonAnim }}>
          <TouchableOpacity onPress={toggleForm}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? Sign Up Here" : "Already have an account? Login Here"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  content: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  image: {
    alignSelf: "center",
    marginTop: 50,
    width: 160,
    height: 160,
  },
  welcome: {
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    fontSize: 36,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    width: "100%",
  },
  eyeIcon: {
    marginBottom:18,
    marginLeft: -40,
  },
  button: {
    backgroundColor: "blueviolet",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  toggleText: {
    color: "#ccc",
    marginTop: 20,
    fontSize: 16,
  },
});

export default LoginScreen;
