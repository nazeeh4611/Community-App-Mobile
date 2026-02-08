import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateMeetupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '18:00',
    location: '',
    address: '',
    maxAttendees: '',
    community: 'Dubai Tech Innovators',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const communities = [
    'Dubai Tech Innovators',
    'Art Lovers Dubai',
    'Yoga & Wellness Dubai',
    'Foodie Adventures',
    'Business Networking',
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setFormData({ ...formData, time: formattedTime });
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.location || !formData.address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Meetup created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Meetup</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <View style={styles.form}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Meetup Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Community *</Text>
            <View style={styles.communitySelector}>
              {communities.map((community) => (
                <TouchableOpacity
                  key={community}
                  style={[
                    styles.communityOption,
                    formData.community === community && styles.communityOptionSelected
                  ]}
                  onPress={() => handleInputChange('community', community)}>
                  <Icon 
                    name="people" 
                    size={16} 
                    color={formData.community === community ? '#FFF' : '#FF6B35'} 
                  />
                  <Text style={[
                    styles.communityOptionText,
                    formData.community === community && styles.communityOptionTextSelected
                  ]}>
                    {community}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Meetup Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="What's your meetup about?"
              value={formData.title}
              onChangeText={(text) => handleInputChange('title', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your meetup..."
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          
          <View style={styles.datetimeRow}>
            <View style={styles.datetimeGroup}>
              <Text style={styles.label}>Date *</Text>
              <TouchableOpacity 
                style={styles.datetimeButton}
                onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar-outline" size={20} color="#FF6B35" />
                <Text style={styles.datetimeText}>{formatDate(formData.date)}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.datetimeGroup}>
              <Text style={styles.label}>Time *</Text>
              <TouchableOpacity 
                style={styles.datetimeButton}
                onPress={() => setShowTimePicker(true)}>
                <Icon name="time-outline" size={20} color="#FF6B35" />
                <Text style={styles.datetimeText}>{formData.time}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Venue Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Dubai Internet City, Conference Room A"
              value={formData.location}
              onChangeText={(text) => handleInputChange('location', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter full address including building, floor, etc."
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Maximum Attendees</Text>
            <TextInput
              style={styles.input}
              placeholder="Leave empty for unlimited"
              value={formData.maxAttendees}
              onChangeText={(text) => handleInputChange('maxAttendees', text)}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Additional Details</Text>
          
          <View style={styles.detailItem}>
            <Icon name="images-outline" size={20} color="#666" />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Add Photos</Text>
              <Text style={styles.detailDescription}>Upload photos for your meetup</Text>
            </View>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <Icon name="pricetag-outline" size={20} color="#666" />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Add Tags</Text>
              <Text style={styles.detailDescription}>Help people find your meetup</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <Icon name="cash-outline" size={20} color="#666" />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Ticket Price</Text>
              <Text style={styles.detailDescription}>Set price if it's a paid event</Text>
            </View>
            <TouchableOpacity style={styles.priceButton}>
              <Text style={styles.priceButtonText}>Free</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.submitGradient}>
            <Icon name="calendar" size={20} color="#FFF" />
            <Text style={styles.submitButtonText}>Create Meetup</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Make sure all details are accurate. Changes can be made until 24 hours before the meetup.
        </Text>
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
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  form: {
    padding: 20,
  },
  formSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  communitySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  communityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
  },
  communityOptionSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  communityOptionText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  communityOptionTextSelected: {
    color: '#FFF',
  },
  datetimeRow: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  datetimeGroup: {
    flex: 1,
    paddingHorizontal: 5,
  },
  datetimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  datetimeText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  detailInfo: {
    flex: 1,
    marginLeft: 15,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  uploadButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  uploadText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  priceButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  priceButtonText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
});

export default CreateMeetupScreen;