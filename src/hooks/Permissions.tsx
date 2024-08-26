import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const usePermissions = (name: string) => {
  const [granted, setGranted] = useState<boolean>();

  const toggle = async (value: boolean = !granted) => {
    await AsyncStorage.setItem(`@homer-quotes_permissions.${name}`, `${value}`);
    setGranted(value);
  };

  useEffect(() => {
    // AsyncStorage.removeItem(`@homer-quotes_permissions.notifications`);
    AsyncStorage.getItem(`@homer-quotes_permissions.${name}`).then((value) => {
      setGranted(value ? value === "true" : undefined);
    });
    // AsyncStorage.setItem(`@homer-quotes_permissions.notifications`, `false`);
  }, [name]);

  return [granted, toggle] as const;
};
