import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const HostDashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    totalCommunities: 3,
    totalMembers: 1245,
    upcomingMeetups: 8,
    activeMembers: 856,
  });

  const [communities, setCommunities] = useState([
    {
      id: '1',
      name: 'Dubai Tech Innovators',
      members: 567,
      meetups: 24,
      growth: '+12%',
      status: 'active'
    },
    {
      id: '2',
      name: 'Startup Founders Dubai',
      members: 342,
      meetups: 15,
      growth: '+8%',
      status: 'active'
    },
    {
      id: '3',
      name: 'AI & ML Enthusiasts',
      members: 336,
      meetups: 10,
      growth: '+15%',
      status: 'active'
    },
  ]);

  const [upcomingMeetups, setUpcomingMeetups] = useState([
    {
      id: '1',
      title: 'AI Workshop',
      community: 'Dubai Tech Innovators',
      date: 'Tomorrow',
      time: '6:00 PM',
      attendees: 45,
      capacity: 100,
    },
    {
      id: '2',
      title: 'Startup Pitch Night',
      community: 'Startup Founders Dubai',
      date: 'Dec 25',
      time: '7:30 PM',
      attendees: 68,
      capacity: 150,
    },
    {
      id: '3',
      title: 'Blockchain Discussion',
      community: 'AI & ML Enthusiasts',
      date: 'Dec 28',
      time: '8:00 PM',
      attendees: 32,
      capacity: 80,
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: '1', type: 'new_member', community: 'Dubai Tech Innovators', time: '2 hours ago' },
    { id: '2', type: 'meetup_created', community: 'Startup Founders Dubai', time: '1 day ago' },
    { id: '3', type: 'member_left', community: 'AI & ML Enthusiasts', time: '2 days ago' },
    { id: '4', type: 'new_rsvp', community: 'Dubai Tech Innovators', time: '3 days ago' },
  ]);

  const renderStatCard = (title, value, subtitle, icon, color) => (
    <TouchableOpacity style={styles.statCard}>
      <LinearGradient colors={[color, `${color}DD`]} style={styles.statGradient}>
        <View style={styles.statIconContainer}>
          <Icon name={icon} size={24} color="#FFF" />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCommunityCard = ({ item }) => (
    <TouchableOpacity style={styles.communityCard}>
      <LinearGradient colors={['#FFF', '#FFF']} style={styles.communityContent}>
        <View style={styles.communityHeader}>
          <View style={styles.communityIcon}>
            <Icon name="people" size={24} color="#FF6B35" />
          </View>
          <View style={styles.communityInfo}>
            <Text style={styles.communityName}>{item.name}</Text>
            <View style={styles.growthBadge}>
              <Icon name="trending-up" size={12} color="#4CAF50" />
              <Text style={styles.growthText}>{item.growth}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.communityStats}>
          <View style={styles.statItem}>
            <Icon name="people-outline" size={16} color="#666" />
            <Text style={styles.statText}>{item.members} members</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="calendar-outline" size={16} color="#666" />
            <Text style={styles.statText}>{item.meetups} meetups</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageButtonText}>Manage</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderMeetupCard = ({ item }) => (
    <TouchableOpacity style={styles.meetupCard}>
      <View style={styles.meetupHeader}>
        <View style={styles.meetupDate}>
          <Text style={styles.meetupDateDay}>{item.date}</Text>
        </View>
        <View style={styles.meetupInfo}>
          <Text style={styles.meetupTitle}>{item.title}</Text>
          <Text style={styles.meetupCommunity}>{item.community}</Text>
        </View>
      </View>
      
      <View style={styles.meetupDetails}>
        <View style={styles.detailItem}>
          <Icon name="time-outline" size={14} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="people-outline" size={14} color="#666" />
          <Text style={styles.detailText}>{item.attendees}/{item.capacity}</Text>
        </View>
      </View>

      <View style={styles.meetupActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
          <Text style={[styles.actionButtonText, styles.viewButtonText]}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderActivity = ({ item }) => {
    const getActivityIcon = (type) => {
      switch(type) {
        case 'new_member': return { icon: 'person-add', color: '#4CAF50' };
        case 'meetup_created': return { icon: 'calendar', color: '#2196F3' };
        case 'member_left': return { icon: 'person-remove', color: '#F44336' };
        case 'new_rsvp': return { icon: 'checkmark-circle', color: '#FF9800' };
        default: return { icon: 'notifications', color: '#666' };
      }
    };

    const getActivityText = (type, community) => {
      switch(type) {
        case 'new_member': return `New member joined ${community}`;
        case 'meetup_created': return `New meetup created in ${community}`;
        case 'member_left': return `Member left ${community}`;
        case 'new_rsvp': return `New RSVP in ${community}`;
        default: return 'New activity';
      }
    };

    const { icon, color } = getActivityIcon(item.type);

    return (
      <View style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: `${color}20` }]}>
          <Icon name={icon} size={16} color={color} />
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityText}>{getActivityText(item.type, item.community)}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back, Host!</Text>
            <Text style={styles.dateText}>Thursday, December 19, 2024</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-outline" size={24} color="#FFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          {renderStatCard('Communities', stats.totalCommunities, 'Total', 'people', '#FF6B35')}
          {renderStatCard('Members', stats.totalMembers, 'Total', 'person', '#4CAF50')}
        </View>
        <View style={styles.statsRow}>
          {renderStatCard('Upcoming', stats.upcomingMeetups, 'Meetups', 'calendar', '#2196F3')}
          {renderStatCard('Active', stats.activeMembers, 'This month', 'pulse', '#FF9800')}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Communities</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateCommunity')}>
            <Icon name="add" size={16} color="#FFF" />
            <Text style={styles.createButtonText}>Create New</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={communities}
          renderItem={renderCommunityCard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.communitiesList}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Meetups</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => navigation.navigate('CreateMeetup')}>
            <Icon name="add" size={16} color="#FF6B35" />
            <Text style={styles.seeAllText}>Create Meetup</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={upcomingMeetups}
          renderItem={renderMeetupCard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.meetupsList}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesList}>
          {recentActivities.map((activity) => (
            <View key={activity.id}>
              {renderActivity({ item: activity })}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('CreateMeetup')}>
            <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.actionGradient}>
              <Icon name="calendar" size={24} color="#FFF" />
              <Text style={styles.actionCardText}>Schedule Meetup</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('CreateCommunity')}>
            <LinearGradient colors={['#2196F3', '#42A5F5']} style={styles.actionGradient}>
              <Icon name="people" size={24} color="#FFF" />
              <Text style={styles.actionCardText}>Manage Members</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <LinearGradient colors={['#FF9800', '#FFB74D']} style={styles.actionGradient}>
              <Icon name="analytics" size={24} color="#FFF" />
              <Text style={styles.actionCardText}>View Analytics</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <LinearGradient colors={['#9C27B0', '#BA68C8']} style={styles.actionGradient}>
              <Icon name="chatbubbles" size={24} color="#FFF" />
              <Text style={styles.actionCardText}>Messages</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  dateText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsGrid: {
    paddingHorizontal: 20,
    marginTop: -30,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.9,
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 10,
    color: '#FFF',
    opacity: 0.7,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  communitiesList: {
    paddingRight: 20,
  },
  communityCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  communityContent: {
    padding: 15,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  communityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE5B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  growthText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 2,
  },
  communityStats: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 5,
  },
  manageButton: {
    backgroundColor: '#FFE5B4',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  meetupsList: {
    paddingRight: 20,
  },
  meetupCard: {
    width: 220,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
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
    minWidth: 50,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  meetupCommunity: {
    fontSize: 11,
    color: '#666',
  },
  meetupDetails: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 5,
  },
  meetupActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  actionButtonText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#FF6B35',
  },
  viewButtonText: {
    color: '#FFF',
  },
  activitiesList: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE5B4',
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5B4',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#999',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  actionCard: {
    width: '48%',
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionCardText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HostDashboardScreen;