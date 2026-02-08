import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const MeetupsScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  
  const upcomingMeetups = [
    {
      id: '1',
      title: 'AI & Machine Learning Workshop',
      date: 'Dec 20, 2024',
      time: '6:00 PM',
      location: 'Dubai Internet City',
      community: 'Dubai Tech Innovators',
      attendees: 45,
      maxAttendees: 100,
      rsvpStatus: 'going'
    },
    {
      id: '2',
      title: 'Art Exhibition Opening Night',
      date: 'Dec 22, 2024',
      time: '7:30 PM',
      location: 'Alserkal Avenue',
      community: 'Art Lovers Dubai',
      attendees: 89,
      maxAttendees: 150,
      rsvpStatus: 'maybe'
    },
    {
      id: '3',
      title: 'Morning Yoga at Kite Beach',
      date: 'Dec 23, 2024',
      time: '7:00 AM',
      location: 'Kite Beach',
      community: 'Yoga & Wellness Dubai',
      attendees: 25,
      maxAttendees: 50,
      rsvpStatus: 'going'
    },
  ];

  const pastMeetups = [
    {
      id: '4',
      title: 'Tech Networking Event',
      date: 'Dec 15, 2024',
      time: '6:00 PM',
      location: 'DIFC',
      community: 'Dubai Tech Innovators',
      attendees: 120
    },
    {
      id: '5',
      title: 'Food Tasting Festival',
      date: 'Dec 10, 2024',
      time: '8:00 PM',
      location: 'Downtown Dubai',
      community: 'Foodie Adventures',
      attendees: 200
    },
  ];

  const renderMeetupCard = (meetup, isPast = false) => (
    <TouchableOpacity style={styles.meetupCard}>
      <View style={styles.meetupHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateDay}>{meetup.date.split(' ')[1].replace(',', '')}</Text>
          <Text style={styles.dateMonth}>{meetup.date.split(' ')[0]}</Text>
        </View>
        <View style={styles.meetupInfo}>
          <Text style={styles.meetupTitle}>{meetup.title}</Text>
          <Text style={styles.meetupCommunity}>{meetup.community}</Text>
          <View style={styles.meetupDetails}>
            <View style={styles.detailItem}>
              <Icon name="time-outline" size={14} color="#666" />
              <Text style={styles.detailText}>{meetup.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="location-outline" size={14} color="#666" />
              <Text style={styles.detailText}>{meetup.location}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.meetupFooter}>
        {!isPast ? (
          <>
            <View style={styles.attendeesContainer}>
              <Icon name="people-outline" size={16} color="#666" />
              <Text style={styles.attendeesText}>
                {meetup.attendees}/{meetup.maxAttendees} attending
              </Text>
            </View>
            <TouchableOpacity style={[
              styles.rsvpButton,
              meetup.rsvpStatus === 'going' ? styles.rsvpGoing : 
              meetup.rsvpStatus === 'maybe' ? styles.rsvpMaybe : styles.rsvpNotGoing
            ]}>
              <Text style={styles.rsvpButtonText}>
                {meetup.rsvpStatus === 'going' ? 'Going' : 
                 meetup.rsvpStatus === 'maybe' ? 'Maybe' : 'Not Going'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.pastMeetupFooter}>
            <Text style={styles.pastText}>Past Event</Text>
            <Text style={styles.attendeesText}>{meetup.attendees} attended</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.header}>
        <Text style={styles.headerTitle}>Meetups</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search meetups..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateMeetup')}>
            <Icon name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'upcoming' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('upcoming')}>
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
          {selectedTab === 'upcoming' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'past' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('past')}>
          <Text style={[styles.tabText, selectedTab === 'past' && styles.tabTextActive]}>
            Past
          </Text>
          {selectedTab === 'past' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'myrsvp' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('myrsvp')}>
          <Text style={[styles.tabText, selectedTab === 'myrsvp' && styles.tabTextActive]}>
            My RSVPs
          </Text>
          {selectedTab === 'myrsvp' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedTab === 'upcoming' ? upcomingMeetups : 
              selectedTab === 'past' ? pastMeetups : upcomingMeetups}
        renderItem={({ item }) => renderMeetupCard(item, selectedTab === 'past')}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.meetupsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="calendar-outline" size={60} color="#FFE5B4" />
            <Text style={styles.emptyTitle}>No meetups found</Text>
            <Text style={styles.emptyText}>
              {selectedTab === 'upcoming' ? 'No upcoming meetups scheduled' :
               selectedTab === 'past' ? 'No past meetups' :
               'No RSVPs yet'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5B4',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  tabButtonActive: {
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FF6B35',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#FF6B35',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  meetupsList: {
    padding: 20,
    paddingBottom: 30,
  },
  meetupCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFE5B4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  meetupHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  dateContainer: {
    backgroundColor: '#FFE5B4',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 70,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  dateMonth: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 5,
  },
  meetupInfo: {
    flex: 1,
  },
  meetupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meetupCommunity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  meetupDetails: {
    flexDirection: 'row',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  meetupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 0,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  rsvpButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rsvpGoing: {
    backgroundColor: '#4CAF50',
  },
  rsvpMaybe: {
    backgroundColor: '#FFC107',
  },
  rsvpNotGoing: {
    backgroundColor: '#F44336',
  },
  rsvpButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  pastMeetupFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default MeetupsScreen;