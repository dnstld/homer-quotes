import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, Text, SectionList } from "react-native";

import QuoteListItem from "../../components/QuoteListItem";
import QuotesContext, { QuoteProps } from "../../context/quotes-context";
import { useContext } from "react";

export default function ListScreen() {
  const { quotes, loading } = useContext(QuotesContext);

  const sortedQuotes = quotes.sort((a, b) => {
    if (a.season === b.season) {
      return a.episode - b.episode;
    }
    return a.season - b.season;
  });

  const sections = sortedQuotes.reduce((acc, quote) => {
    const { season, seasonName } = quote;
    const section = acc.find((s) => s.season === season);
    if (section) {
      section.data.push(quote);
    } else {
      acc.push({ season, title: seasonName, data: [quote] });
    }
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading && <Text>Loading...</Text>}
      {quotes && (
        <SectionList
          sections={sections.map((seasonSection) => ({
            ...seasonSection,
            data: seasonSection.data.map((episodeSection) => ({
              ...episodeSection,
              key: `${seasonSection.season}-${episodeSection.episode}`,
              data: episodeSection.data,
            })),
          }))}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.sectionList}
          renderItem={({ item }) => <QuoteListItem {...item} />}
          renderSectionHeader={({ section: { season } }) => (
            <Text style={styles.sectionListHeader}>{`Season ${season}`}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionList: {
    paddingBottom: 50,
  },
  sectionListHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#F8659F",
    color: "white",
  },
});
