import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";
import { QuotesProvider } from "../context/quotes-context";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DNS,
  tracesSampleRate: 1.0,
  attachScreenshot: true,
  debug: false,
  _experiments: {
    profilesSampleRate: 1.0,
  },

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

const RootLayout = () => {
  const router = useRouter();
  return (
    <QuotesProvider>
      <Stack
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#00AAFF" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Back",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="list/index"
          options={{
            headerTitle: "The Simpsons",
          }}
        />
        <Stack.Screen
          name="share/[id]"
          options={{
            headerStyle: { backgroundColor: "white" },
            headerRight: () => (
              <Button title="Close" onPress={() => router.back()} />
            ),
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="settings/index"
          options={{
            headerTitle: "Settings",
          }}
        />
      </Stack>
    </QuotesProvider>
  );
};

export default RootLayout;
