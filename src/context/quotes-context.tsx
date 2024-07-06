import React, { createContext, useState, useEffect, ReactNode } from "react";

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
  loading: boolean;
}

const QuotesContext = createContext<QuotesContextProps>({
  quotes: [],
  loading: true,
});

export const QuotesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [quotes, setQuotes] = useState<QuoteProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.sharedtattoo.com");
        const { data } = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <QuotesContext.Provider value={{ quotes, loading }}>
      {children}
    </QuotesContext.Provider>
  );
};

export default QuotesContext;
