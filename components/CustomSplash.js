import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Animated, Easing, Image } from 'react-native';

const CustomSplash = () => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const imageScaleAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation for fading in the entire content
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Animation for scaling the image
    Animated.timing(imageScaleAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animation for fading in the text
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
      delay: 500, // Delay for text animation
    }).start();
  }, [fadeInAnim, imageScaleAnim, textFadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
        <View style={styles.textContainer}>
          <Animated.Image
            source={require('../assets/splash-hero.png')}
            style={[styles.image, {
              transform: [
                { scale: imageScaleAnim },
              ]
            }]}
          />
          <Animated.Text style={[styles.heading, { opacity: textFadeAnim }]}>
            Stu<Text style={{ color: "blueviolet" }}>dex</Text>
          </Animated.Text>
          <Animated.Text style={[styles.content, { opacity: textFadeAnim }]}>
            Connecting students, sharing experiences
          </Animated.Text>
          <Animated.Text style={[styles.content, { opacity: textFadeAnim }]}>
            and exploring education together.
          </Animated.Text>
          <ActivityIndicator
            size="large"
            color="blueviolet"
            style={styles.loader}
          />
          <Text style={styles.footerText}>Designed by Royal Coders</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222831",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
  },
  heading: {
    color: "#FFF",
    letterSpacing: 3,
    fontSize: 62,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    color: "#faf4f4",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  loader: {
    flex: 1,
  },
  footerText: {
    position: 'absolute',
    bottom: 20,
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  image: {
    width: 280,
    height: 150,
    marginBottom: 80,
    marginTop: 40,
  },
});

export default CustomSplash;
