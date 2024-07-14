import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, SectionList } from "react-native";

import QuoteListItem from "../../components/QuoteListItem";
import QuotesContext, { QuoteProps } from "../../context/quotes-context";
import React, { useContext } from "react";

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
      renderSectionHeader={({ section: { title, season } }) => (
        <Text style={styles.sectionListHeader}>{`${season}. ${title}`}</Text>
      )}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionList: {
    paddingBottom: 50,
    flex: 1,
  },
  sectionListHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "white",
    color: "black",
  },
});
