import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SplashScreen from "expo-splash-screen";

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

export const QuotesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [quotes, setQuotes] = useState<QuoteProps[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        SplashScreen.preventAutoHideAsync();
        const response = await fetch("https://api.sharedtattoo.com");
        const { data } = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 3000);
      }
    };

    fetchQuotes();

    return () => {
      SplashScreen.hideAsync();
    };
  }, []);

  return (
    <QuotesContext.Provider value={{ quotes }}>
      {children}
    </QuotesContext.Provider>
  );
};

export default QuotesContext;
