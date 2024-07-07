import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SectionList } from "react-native";

import QuoteListItem from "../../components/QuoteListItem";
import QuotesContext, { QuoteProps } from "../../context/quotes-context";
import { useContext } from "react";

export default function ListScreen() {
  const { quotes } = useContext(QuotesContext);

  const sortedQuotes = quotes.sort((a, b) => {
    if (Number(a.season) === Number(b.season)) {
      return Number(a.episode) - Number(b.episode);
    }
    return Number(a.season) - Number(b.season);
  });

  const sections = sortedQuotes.reduce(
    (
      acc: {
        season: string;
        episode: string;
        time: string;
        title: string;
        data: any[];
      }[],
      quote
    ) => {
      const { season, episode, time, name } = quote;
      const section = acc.find((s) => s.season === season);
      if (section) {
        section.data.push(quote);
      } else {
        acc.push({ season, episode, time, title: name, data: [quote] });
      }
      return acc;
    },
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

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
