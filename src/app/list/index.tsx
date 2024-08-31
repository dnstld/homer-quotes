import { StyleSheet, Text, SectionList, View } from "react-native";

import QuoteListItem from "../../components/QuoteListItem";
import QuotesContext from "../../context/quotes-context";
import React, { useContext } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ListScreen() {
  const { quotes } = useContext(QuotesContext);

  const checkIndexIsEven = (n: number) => {
    return n % 2 == 0;
  };

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
      renderItem={({ item, index }) => (
        <QuoteListItem even={checkIndexIsEven(index)} {...item} />
      )}
      renderSectionHeader={({ section: { title, season } }) => (
        <Text style={styles.sectionListHeader}>{`S${season}: ${title}`}</Text>
      )}
      ListHeaderComponent={() => (
        <View style={styles.dashboard}>
          <View style={styles.dashboardItem}>
            <MaterialCommunityIcons
              name="television-classic"
              size={32}
              color="white"
            />
            <View>
              <Text style={styles.dashboardData}>35</Text>
              <Text style={styles.dashboardName}>seasons</Text>
            </View>
          </View>
          <View style={styles.dashboardItem}>
            <MaterialCommunityIcons name="popcorn" size={32} color="white" />
            <View>
              <Text style={styles.dashboardData}>768</Text>
              <Text style={styles.dashboardName}>episodes</Text>
            </View>
          </View>
          <View style={styles.dashboardItem}>
            <MaterialCommunityIcons
              name="comment-quote"
              size={32}
              color="white"
            />
            <View>
              <Text style={styles.dashboardData}>1765</Text>
              <Text style={styles.dashboardName}>quotes</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: "#F8659F",
    color: "white",
  },
  dashboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#00aaff",
    gap: 16,
    padding: 16,
  },
  dashboardItem: {
    alignItems: "center",
    padding: 16,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffff33",
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
  },
  dashboardData: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  dashboardName: {
    fontSize: 12,
    color: "#ffffff",
  },
});
