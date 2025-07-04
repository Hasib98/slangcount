import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import type { ViewToken } from "react-native";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const images = {
  "cat-1": require("../../assets/images/cat-1.svg"),
  "cat-2": require("../../assets/images/cat-2.svg"),
  "cat-3": require("../../assets/images/cat-3.svg"),
} as const;

type ImageKey = keyof typeof images;

type Slide = {
  key: string;
  title: string;
  image: ImageKey;
  desc: string;
};

const slides: Slide[] = [
  {
    key: "slide1",
    title: "Break the Habit, Speak Positive!",
    image: "cat-1",
    desc: "Welcome to Slang Count! Track your slang and curse words with a tap, and start building better language habits.",
  },
  {
    key: "slide2",
    title: "Track Your Progress",
    image: "cat-2",
    desc: "See your stats and challenge yourself to use less slang each day. Celebrate your wins and keep improving!",
  },
  {
    key: "slide3",
    title: "Ready to Start?",
    image: "cat-3",
    desc: "Let's begin your journey to positive communication. Press 'Get Started' to continue!",
  },
  {
    key: "slide4",
    title: "Ready to dsfg?",
    image: "cat-2",
    desc: "Let's begin your journey to positive communication. Press 'Get Started' to continue!",
  },
  {
    key: "slide5",
    title: "Ready to dsfg?",
    image: "cat-2",
    desc: "Let's begin your journey to positive communication. Press 'Get Started' to continue!",
  },
  {
    key: "slide6",
    title: "Ready to dsfg?",
    image: "cat-2",
    desc: "Let's begin your journey to positive communication. Press 'Get Started' to continue!",
  },
  {
    key: "slide7",
    title: "Ready to dsfg?",
    image: "cat-2",
    desc: "Let's begin your journey to positive communication. Press 'Get Started' to continue!",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const progressAnim = useRef(
    new Animated.Value((1 / slides.length) * 100)
  ).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: ((currentIndex + 1) / slides.length) * 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, progressAnim]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleBack = () => {
    if (!(currentIndex > 0)) {
      router.replace("/");
      return;
    }
    flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
  };

  const handleSkip = () => {
    router.replace("/(auth)/sign-in");
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={handleBack}
          // disabled={currentIndex === 0}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip} style={styles.skipCapsule}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: Slide }) => (
          <View
            style={{
              width,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 24,
            }}
          >
            <Image
              source={images[item.image]}
              style={styles.illustration}
              contentFit="cover"
            />
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={{ flexGrow: 0 }}
      />

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          {currentIndex !== slides.length - 1 ? (
            <MaterialIcons name="navigate-next" size={24} color="white" />
          ) : (
            <FontAwesome6
              name="person-walking-dashed-line-arrow-right"
              size={24}
              color="white"
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 24,
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: { fontSize: 20, color: "#222" },
  skipCapsule: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skipText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  illustration: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginVertical: 32,
  },
  card: {
    backgroundColor: "#e8f5ff",
    borderRadius: 18,
    marginHorizontal: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#585858",
    textAlign: "center",
    marginBottom: 12,
  },
  desc: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 32,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginRight: 16,
  },
  progressFill: {
    width: "33%",
    height: 6,
    backgroundColor: "#6d66f9",
    borderRadius: 3,
  },
  nextBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
});
