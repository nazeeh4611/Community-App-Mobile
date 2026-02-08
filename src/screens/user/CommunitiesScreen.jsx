import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CommunitiesScreen = ({ navigation }) => {
  const [communities, setCommunities] = useState([
    { id: '1', name: 'Dubai Tech Innovators', members: 245, category: 'Technology', location: 'Dubai Marina', isJoined: true },
    { id: '2', name: 'Art Lovers Dubai', members: 189, category: 'Arts', location: 'Alserkal Avenue', isJoined: false },
    { id: '3', name: 'Yoga & Wellness Dubai', members: 312, category: 'Wellness', location: 'Jumeirah', isJoined: true },
    { id: '4', name: 'Foodie Adventures', members: 456, category: 'Food', location: 'Downtown Dubai', isJoined: false },
    { id: '5', name: 'Business Networking', members: 567, category: 'Business', location: 'DIFC', isJoined: true },
    { id: '6', name: 'Dubai Runners Club', members: 345, category: 'Sports', location: 'Kite Beach', isJoined: false },
    { id: '7', name: 'Book Lovers Dubai', members: 234, category: 'Education', location: 'Dubai Mall', isJoined: true },
    { id: '8', name: 'Startup Founders Dubai', members: 189, category: 'Business', location: 'Dubai Internet City', isJoined: false },
  ]);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Technology', 'Arts', 'Wellness', 'Food', 'Business', 'Sports', 'Education', 'Social'];
  const locations = ['All', 'Dubai Marina', 'Downtown Dubai', 'Jumeirah', 'Alserkal Avenue', 'DIFC', 'Dubai Internet City'];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleJoinCommunity = (id) => {
    setCommunities(communities.map(community => 
      community.id === id ? { ...community, isJoined: !community.isJoined } : community
    ));
  };

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(community.category);
    const matchesLocation = selectedLocation === 'All' || community.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const renderCommunity = ({ item }) => (
    <TouchableOpacity 
      style={styles.communityCard}
      onPress={() => navigation.navigate('CommunityDetail', { community: item })}>
      <LinearGradient colors={['#FFF', '#FFF']} style={styles.communityContent}>
        <View style={styles.communityHeader}>
          <View style={styles.communityIconContainer}>
            <Icon name="people" size={24} color="#FF6B35" />
          </View>
          <View style={styles.communityInfo}>
            <Text style={styles.communityName}>{item.name}</Text>
            <Text style={styles.communityCategory}>{item.category}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.joinButton, item.isJoined && styles.joinedButton]}
            onPress={() => toggleJoinCommunity(item.id)}>
            <Text style={[styles.joinButtonText, item.isJoined && styles.joinedButtonText]}>
              {item.isJoined ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.communityDetails}>
          <View style={styles.detailItem}>
            <Icon name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.members} members</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.header}>
        <Text style={styles.headerTitle}>Communities</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}>
            <Icon name="filter" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{communities.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{communities.filter(c => c.isJoined).length}</Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>

      <FlatList
        data={filteredCommunities}
        renderItem={renderCommunity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.communitiesList}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Categories</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategories.includes(category) && styles.categoryChipSelected
                    ]}
                    onPress={() => toggleCategory(category)}>
                    <Text style={[
                      styles.categoryChipText,
                      selectedCategories.includes(category) && styles.categoryChipTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Location</Text>
              <View style={styles.locationList}>
                {locations.map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={[
                      styles.locationItem,
                      selectedLocation === location && styles.locationItemSelected
                    ]}
                    onPress={() => setSelectedLocation(location)}>
                    <Text style={[
                      styles.locationText,
                      selectedLocation === location && styles.locationTextSelected
                    ]}>
                      {location}
                    </Text>
                    {selectedLocation === location && (
                      <Icon name="checkmark" size={20} color="#FF6B35" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setSelectedCategories([]);
                  setSelectedLocation('All');
                }}>
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setFilterModalVisible(false)}>
                <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.gradientButton}>
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filterButton: {
    backgroundColor: '#FF6B35',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: -20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#FFE5B4',
  },
  communitiesList: {
    padding: 20,
    paddingTop: 30,
  },
  communityCard: {
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
  },
  communityContent: {
    padding: 20,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  communityIconContainer: {
    backgroundColor: '#FFE5B4',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  communityCategory: {
    fontSize: 12,
    color: '#666',
  },
  joinButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinedButton: {
    backgroundColor: '#FF6B35',
  },
  joinButtonText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#FFF',
  },
  communityDetails: {
    flexDirection: 'row',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterSection: {
    marginBottom: 25,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryChipSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryChipText: {
    color: '#FF6B35',
    fontSize: 12,
  },
  categoryChipTextSelected: {
    color: '#FFF',
  },
  locationList: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5B4',
  },
  locationItemSelected: {
    backgroundColor: '#FFF9F0',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  locationTextSelected: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  resetButtonText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default CommunitiesScreen;