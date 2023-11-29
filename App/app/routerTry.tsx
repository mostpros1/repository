import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const routerTry = () => {
  const navigation = useNavigation();

  const navigateToPageTwo = () => {
    navigation.navigate("routerTryTwo" as never);
  };

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Pressable onPress={navigateToPageTwo}>
        <Text>Start</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default routerTry;
