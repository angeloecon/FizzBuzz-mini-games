import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabMenuProps = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const TabMenu = ({ tabs, activeTab, onTabChange }: TabMenuProps) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabChange(tab)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    marginBottom: 10,
    paddingTop: 10,
  },
  tab: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flex: 1,
  },
  activeTab: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    fontWeight: "600",
    color: "#666",
    fontSize: 12,
  },
  activeTabText: {
    color: "white",
  },
});

export default TabMenu;
