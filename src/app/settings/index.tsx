import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Switch } from "react-native";

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Controls</Text>
      <View style={styles.switchContainer}>
        <Text>Push notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#F8659F" }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#9b9b9b"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View
        style={{
          borderBottomColor: "#767577",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: 16,
        }}
      />

      <Text style={styles.title}>About</Text>
      <Text>
        Explore hilarious Homer Simpson quotes spanning every season of The
        Simpsons. Tap, laugh, and share the fun with friends! D'oh!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
