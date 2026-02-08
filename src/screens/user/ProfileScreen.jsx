import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'Ahmed Al Maktoum',
    email: 'ahmed@example.com',
    phone: '+971 50 123 4567',
    location: 'Dubai Marina, Dubai',
    bio: 'Tech enthusiast and community builder. Love connecting people and creating meaningful experiences.',
    joinedDate: 'January 2024',
  });

  const [joinedCommunities, setJoinedCommunities] = useState([
    { id: '1', name: 'Dubai Tech Innovators', members: 245 },
    { id: '2', name: 'Yoga & Wellness Dubai', members: 312 },
    { id: '3', name: 'Business Networking', members: 567 },
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: '1', title: 'AI Workshop', date: 'Dec 20', community: 'Dubai Tech Innovators' },
    { id: '2', title: 'Morning Yoga', date: 'Dec 22', community: 'Yoga & Wellness Dubai' },
  ]);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', action: 'editProfile' },
    { icon: 'notifications-outline', label: 'Notifications', action: 'notifications' },
    { icon: 'lock-closed-outline', label: 'Privacy & Security', action: 'privacy' },
    { icon: 'help-circle-outline', label: 'Help & Support', action: 'help' },
    { icon: 'document-text-outline', label: 'Terms & Conditions', action: 'terms' },
    { icon: 'log-out-outline', label: 'Logout', action: 'logout', color: '#FF3B30' },
  ];

  const handleMenuItemPress = (action) => {
    switch(action) {
      case 'logout':
        navigation.navigate('Login');
        break;
      case 'editProfile':
        // Navigate to edit profile screen
        break;
      default:
        console.log(`Pressed ${action}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Icon name="settings-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient colors={['#FFE5B4', '#FFDAB9']} style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera-outline" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{joinedCommunities.length}</Text>
              <Text style={styles.statLabel}>Communities</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{upcomingEvents.length}</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.bioText}>{user.bio}</Text>
            <View style={styles.userDetails}>
              <View style={styles.detailItem}>
                <Icon name="call-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{user.phone}</Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="location-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{user.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="calendar-outline" size={16} color="#666" />
                <Text style={styles.detailText}>Joined {user.joinedDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Communities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {joinedCommunities.map((community) => (
              <TouchableOpacity key={community.id} style={styles.communityCard}>
                <LinearGradient colors={['#FFE5B4', '#FFDAB9']} style={styles.communityGradient}>
                  <Icon name="people" size={24} color="#FF6B35" />
                  <Text style={styles.communityName}>{community.name}</Text>
                  <Text style={styles.communityMembers}>{community.members} members</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateDay}>{event.date}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventCommunity}>{event.community}</Text>
              </View>
              <TouchableOpacity style={styles.eventButton}>
                <Text style={styles.eventButtonText}>View</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Icon name="notifications-outline" size={20} color="#666" />
                <Text style={styles.settingLabel}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#767577', true: '#FFE5B4' }}
                thumbColor={notificationsEnabled ? '#FF6B35' : '#f4f3f4'}
              />
            </View>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Icon name="mail-outline" size={20} color="#666" />
                <Text style={styles.settingLabel}>Email Notifications</Text>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#767577', true: '#FFE5B4' }}
                thumbColor={emailNotifications ? '#FF6B35' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.action)}>
                <View style={styles.menuItemLeft}>
                  <Icon name={item.icon} size={22} color={item.color || '#666'} />
                  <Text style={[styles.menuItemText, item.color && { color: item.color }]}>
                    {item.label}
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Dubai Communities v1.0.0</Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B35',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 30,
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
    marginBottom: 15,
  },
  seeAllText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  aboutCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFE5B4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  userDetails: {
    borderTopWidth: 1,
    borderTopColor: '#FFE5B4',
    paddingTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  communityCard: {
    width: 160,
    height: 160,
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
  },
  communityGradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  communityMembers: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  eventDate: {
    backgroundColor: '#FFE5B4',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 50,
  },
  eventDateDay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  eventCommunity: {
    fontSize: 12,
    color: '#666',
  },
  eventButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  eventButtonText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE5B4',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5B4',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 15,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;