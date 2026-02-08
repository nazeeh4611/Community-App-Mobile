import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CommunityDetailScreen = ({ route, navigation }) => {
  const { community } = route.params || {
    id: '1',
    name: 'Dubai Tech Innovators',
    members: 245,
    category: 'Technology',
    location: 'Dubai Marina',
    description: 'Join Dubai Tech Innovators to connect with tech enthusiasts, attend workshops, and build innovative solutions. We host weekly meetups, hackathons, and networking events.'
  };

  const [isMember, setIsMember] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  const communityDetails = {
    ...community,
    host: 'Ahmed Al Maktoum',
    founded: 'January 2024',
    rules: [
      'Be respectful to all members',
      'No spam or self-promotion',
      'Keep discussions relevant to technology',
      'Help each other grow and learn',
      'Share knowledge and resources',
    ],
    meetups: [
      { id: '1', title: 'AI & Machine Learning Workshop', date: 'Dec 20', time: '6:00 PM', attendees: 45 },
      { id: '2', title: 'Web3 & Blockchain Discussion', date: 'Dec 25', time: '7:30 PM', attendees: 32 },
      { id: '3', title: 'Startup Pitch Night', date: 'Dec 28', time: '8:00 PM', attendees: 68 },
    ],
    membersList: [
      { id: '1', name: 'Ahmed Al Maktoum', role: 'Host' },
      { id: '2', name: 'Sarah Johnson', role: 'Moderator' },
      { id: '3', name: 'Mohammed Ali', role: 'Member' },
      { id: '4', name: 'Fatima Hassan', role: 'Member' },
      { id: '5', name: 'David Chen', role: 'Member' },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>{communityDetails.description}</Text>
            
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Community Info</Text>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Icon name="person-outline" size={20} color="#FF6B35" />
                  <Text style={styles.infoLabel}>Host</Text>
                  <Text style={styles.infoValue}>{communityDetails.host}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="calendar-outline" size={20} color="#FF6B35" />
                  <Text style={styles.infoLabel}>Founded</Text>
                  <Text style={styles.infoValue}>{communityDetails.founded}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="people-outline" size={20} color="#FF6B35" />
                  <Text style={styles.infoLabel}>Members</Text>
                  <Text style={styles.infoValue}>{communityDetails.members}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Icon name="location-outline" size={20} color="#FF6B35" />
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>{communityDetails.location}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Community Rules</Text>
              {communityDetails.rules.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <Icon name="checkmark-circle-outline" size={16} color="#4CAF50" />
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'meetups':
        return (
          <View style={styles.tabContent}>
            {communityDetails.meetups.map((meetup) => (
              <TouchableOpacity key={meetup.id} style={styles.meetupItem}>
                <View style={styles.meetupDate}>
                  <Text style={styles.meetupDateDay}>{meetup.date}</Text>
                  <Text style={styles.meetupDateText}>DEC</Text>
                </View>
                <View style={styles.meetupInfo}>
                  <Text style={styles.meetupTitle}>{meetup.title}</Text>
                  <View style={styles.meetupDetails}>
                    <Icon name="time-outline" size={14} color="#666" />
                    <Text style={styles.meetupDetailText}>{meetup.time}</Text>
                    <Icon name="people-outline" size={14} color="#666" style={styles.detailIcon} />
                    <Text style={styles.meetupDetailText}>{meetup.attendees} attending</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.createMeetupButton} onPress={() => navigation.navigate('CreateMeetup')}>
              <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.gradientButton}>
                <Icon name="add" size={20} color="#FFF" />
                <Text style={styles.createMeetupText}>Create New Meetup</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );

      case 'members':
        return (
          <View style={styles.tabContent}>
            <View style={styles.membersHeader}>
              <Text style={styles.membersCount}>{communityDetails.members} Members</Text>
              <TouchableOpacity style={styles.inviteButton}>
                <Icon name="person-add-outline" size={16} color="#FF6B35" />
                <Text style={styles.inviteText}>Invite</Text>
              </TouchableOpacity>
            </View>
            {communityDetails.membersList.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>{member.name.charAt(0)}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
                {member.role === 'Host' && (
                  <View style={styles.hostBadge}>
                    <Text style={styles.hostBadgeText}>Host</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="share-social-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.communityHeader}>
            <View style={styles.communityIconLarge}>
              <Icon name="people" size={40} color="#FFF" />
            </View>
            <Text style={styles.communityName}>{communityDetails.name}</Text>
            <View style={styles.communityTags}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{communityDetails.category}</Text>
              </View>
              <View style={styles.locationBadge}>
                <Icon name="location-outline" size={12} color="#FFF" />
                <Text style={styles.locationText}>{communityDetails.location}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.actionsBar}>
          <TouchableOpacity 
            style={[styles.actionButton, isMember && styles.joinedButton]}
            onPress={() => setIsMember(!isMember)}>
            <Text style={[styles.actionButtonText, isMember && styles.joinedButtonText]}>
              {isMember ? 'Joined' : 'Join Community'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Icon name="chatbubble-outline" size={20} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          {['about', 'meetups', 'members'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
              {activeTab === tab && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>

      {isMember && (
        <TouchableOpacity 
          style={styles.createMeetupFAB}
          onPress={() => navigation.navigate('CreateMeetup')}>
          <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.fabGradient}>
            <Icon name="add" size={24} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  communityHeader: {
    alignItems: 'center',
  },
  communityIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  communityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  communityTags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  locationText: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 5,
  },
  actionsBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 15,
  },
  joinedButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 16,
  },
  joinedButtonText: {
    color: '#FFF',
  },
  chatButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5B4',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  tabButtonActive: {
    
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
  tabContent: {
    padding: 20,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 25,
  },
  infoSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ruleText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  meetupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  meetupDate: {
    backgroundColor: '#FFE5B4',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 50,
  },
  meetupDateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  meetupDateText: {
    fontSize: 10,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 2,
  },
  meetupInfo: {
    flex: 1,
  },
  meetupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  meetupDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetupDetailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  detailIcon: {
    marginLeft: 15,
  },
  viewButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewButtonText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  createMeetupButton: {
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createMeetupText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 10,
  },
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  membersCount: {
    fontSize: 14,
    color: '#666',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  inviteText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  memberAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 12,
    color: '#666',
  },
  hostBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  hostBadgeText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  createMeetupFAB: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityDetailScreen;