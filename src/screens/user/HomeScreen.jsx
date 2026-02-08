import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [communities] = useState([
    { 
      id: '1', 
      name: 'Dubai Tech Innovators', 
      members: 245, 
      category: 'Technology', 
      location: 'Dubai Marina',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400'
    },
    { 
      id: '2', 
      name: 'Art Lovers Dubai', 
      members: 189, 
      category: 'Arts', 
      location: 'Alserkal Avenue',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'
    },
    { 
      id: '3', 
      name: 'Yoga & Wellness Dubai', 
      members: 312, 
      category: 'Wellness', 
      location: 'Jumeirah',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
    },
    { 
      id: '4', 
      name: 'Foodie Adventures', 
      members: 456, 
      category: 'Food', 
      location: 'Downtown Dubai',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'
    },
    { 
      id: '5', 
      name: 'Business Networking', 
      members: 567, 
      category: 'Business', 
      location: 'DIFC',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400'
    },
  ]);

  const [upcomingMeetups] = useState([
    { 
      id: '1', 
      title: 'Tech Talk: AI in Business', 
      date: 'Tomorrow', 
      time: '6:00 PM', 
      community: 'Dubai Tech Innovators',
      location: 'Dubai Internet City'
    },
    { 
      id: '2', 
      title: 'Art Exhibition Opening', 
      date: 'Dec 20', 
      time: '7:30 PM', 
      community: 'Art Lovers Dubai',
      location: 'Alserkal Avenue'
    },
    { 
      id: '3', 
      title: 'Morning Yoga Session', 
      date: 'Dec 22', 
      time: '7:00 AM', 
      community: 'Yoga & Wellness Dubai',
      location: 'Kite Beach'
    },
    { 
      id: '4', 
      title: 'Food Tasting Event', 
      date: 'Dec 25', 
      time: '8:00 PM', 
      community: 'Foodie Adventures',
      location: 'Downtown Dubai'
    },
  ]);

  const categories = [
    { id: 'all', name: 'All', icon: '📱' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'art', name: 'Arts', icon: '🎨' },
    { id: 'wellness', name: 'Wellness', icon: '💪' },
    { id: 'food', name: 'Food', icon: '🍔' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Render functions MUST be defined BEFORE ListHeader
  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryButton, selectedCategory === item.id && styles.categoryButtonActive]}
      onPress={() => setSelectedCategory(item.id)}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[styles.categoryButtonText, selectedCategory === item.id && styles.categoryButtonTextActive]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderMeetup = ({ item }) => (
    <TouchableOpacity style={styles.meetupCard}>
      <View style={styles.meetupHeader}>
        <View style={styles.meetupDate}>
          <Text style={styles.meetupDateDay}>{item.date}</Text>
        </View>
        <View style={styles.meetupInfo}>
          <Text style={styles.meetupTitle}>{item.title}</Text>
          <Text style={styles.meetupCommunity}>{item.community}</Text>
          <View style={styles.meetupDetails}>
            <Text style={styles.meetupDetailIcon}>🕐</Text>
            <Text style={styles.meetupDetailText}>{item.time}</Text>
            <Text style={styles.meetupDetailIcon}>📍</Text>
            <Text style={styles.meetupDetailText}>{item.location}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.rsvpButton}>
        <Text style={styles.rsvpText}>RSVP</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCommunity = ({ item }) => (
    <TouchableOpacity 
      style={styles.communityCard} 
      onPress={() => navigation.navigate('CommunityDetail', { community: item })}>
      <Image source={{ uri: item.image }} style={styles.communityImage} />
      <View style={styles.communityOverlay}>
        <View style={styles.communityContent}>
          <Text style={styles.communityName}>{item.name}</Text>
          <View style={styles.communityInfoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoText}>{item.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>👥</Text>
              <Text style={styles.infoText}>{item.members}</Text>
            </View>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Header Component - NOW render functions are defined
  const ListHeader = () => (
    <View>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello, User!</Text>
            <Text style={styles.locationText}>📍 Dubai, UAE</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>👤</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Find Your Community</Text>
        
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities or meetups..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Upcoming Meetups Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Meetups</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={upcomingMeetups}
          renderItem={renderMeetup}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.meetupsList}
        />
      </View>

      {/* Popular Communities Header */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Communities</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Footer Component
  const ListFooter = () => (
    <View style={styles.footer}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New in Dubai</Text>
        </View>
        <TouchableOpacity style={styles.newCommunityCard}>
          <View style={styles.newCommunityContent}>
            <Text style={styles.newCommunityIcon}>➕</Text>
            <Text style={styles.newCommunityText}>Start Your Own Community</Text>
            <Text style={styles.newCommunitySubtext}>Bring people together</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={communities}
        renderItem={renderCommunity}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.communitiesRow}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FF6B35',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  locationText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 20,
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
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#FF6B35',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 18,
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryButton: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFE5B4',
    alignItems: 'center',
    minWidth: 100,
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryButtonText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#FFF',
  },
  meetupsList: {
    paddingRight: 20,
  },
  meetupCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 280,
    borderWidth: 1,
    borderColor: '#FFE5B4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  meetupHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  meetupDate: {
    backgroundColor: '#FFE5B4',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  meetupDateDay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  meetupInfo: {
    flex: 1,
  },
  meetupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  meetupCommunity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  meetupDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  meetupDetailIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  meetupDetailText: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  rsvpButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  rsvpText: {
    color: '#FFF',
    fontWeight: '600',
  },
  communitiesRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  communityCard: {
    width: '48%',
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  communityImage: {
    width: '100%',
    height: '100%',
  },
  communityOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  communityContent: {
    padding: 12,
  },
  communityName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  communityInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  infoIcon: {
    fontSize: 12,
    marginRight: 3,
  },
  infoText: {
    fontSize: 10,
    color: '#FFF',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  footer: {
    marginTop: 10,
  },
  newCommunityCard: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFE5B4',
    marginBottom: 30,
  },
  newCommunityContent: {
    padding: 30,
    alignItems: 'center',
  },
  newCommunityIcon: {
    fontSize: 50,
  },
  newCommunityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 15,
    textAlign: 'center',
  },
  newCommunitySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default HomeScreen;