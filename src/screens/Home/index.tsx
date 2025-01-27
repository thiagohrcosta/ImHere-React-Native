import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';

import { styles } from './styles';
import { Participant } from '../../components/Participant';
import React, { useState } from 'react';

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd(name: string) {
    if (participants.includes(participantName)) {
      return Alert.alert("Participant already exists.", "The participant you want to add is already on the list.")
    }
    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remove", `Do you want to remove ${name} ?`, [
      {
        text: "Yes",
        onPress: () => Alert.alert("Removed")
      },
      {
        text: "No",
        style: "cancel"
      }
    ])
    console.log(`${name} was removed.`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Event Name</Text>
      <Text style={styles.eventDate}>Friday, January 24, 2025</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Participant's name"
          placeholderTextColor={'#6B6B6B'}
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={( { item }) => (
          <Participant 
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            No one on your list? Add participants to your event.
          </Text>
        )}
      />
    </View>
  );
}
