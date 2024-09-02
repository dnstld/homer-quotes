import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";
import { useFonts } from "@expo-google-fonts/acme";
import { Acme_400Regular } from "@expo-google-fonts/acme";
import mockData from "../../assets/data/mock.json";

export type QuoteProps = {
  id: string;
  season: string;
  seasonName: string;
  episode: string;
  episodeName: string;
  time: string;
  name: string;
  quote: string;
};

interface QuotesContextProps {
  quotes: QuoteProps[];
}

const QuotesContext = createContext<QuotesContextProps>({
  quotes: [],
});

SplashScreen.preventAutoHideAsync();

export const QuotesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [quotes, setQuotes] = useState<QuoteProps[]>([]);

  const [assets] = useAssets([
    require("../../assets/images/homer-simpson-doughnuts.png"),
  ]);
  const [fontsLoaded] = useFonts({
    Acme_400Regular,
  });

  const fetchQuotes = async () => {
    try {
      // @ts-ignore
      setQuotes(mockData);
      // const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      // const response = await fetch(apiUrl);
      // const { data } = await response.json();
      // setQuotes(data);
    } catch (error) {
      console.error(`Failed to fetch quotes: ${error}`);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    if (assets && fontsLoaded) {
      fetchQuotes();
    }
  }, [assets, fontsLoaded]);

  return (
    <QuotesContext.Provider value={{ quotes }}>
      {children}
    </QuotesContext.Provider>
  );
};

export default QuotesContext;
