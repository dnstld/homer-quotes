Development steps:

1. Install React Native with Expo and TS

```
npx create-expo-app -t expo-template-blank-typescript MyFitnessPal
```

2. Install Expo Router

Docs: https://docs.expo.dev/router/installation/

```
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

3. Create FoodListItem component

Icons from: https://icons.expo.fyi/Index

```
<FoodListItem item={{ label: "Pizza", cal: 75, brand: "Dominos" }} />
```

4. Create Search and FlatList elements

```
<TextInput />
<FlatList />
```
