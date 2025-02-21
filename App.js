import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";

export default function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState({});
  const [eventText, setEventText] = useState("");

  const addEvent = () => {
    if (selectedDate && eventText) {
      setEvents((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), eventText],
      }));
      setEventText("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar App</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "blue" },
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: "red" };
            return acc;
          }, {}),
        }}
        
      />
      {selectedDate ? <Text style={styles.dateText}>Selected Date: {selectedDate}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Add Event"
        value={eventText}
        onChangeText={setEventText}
      />
      <Button title="Add Event" onPress={addEvent} />

      {events[selectedDate] && (
        <FlatList
          data={events[selectedDate]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.eventText}>{item}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  dateText: { fontSize: 18, marginVertical: 10, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  eventText: { fontSize: 16, marginVertical: 5, textAlign: "center" },
});

