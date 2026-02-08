import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateCommunityScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    emirate: 'Dubai',
    rules: [''],
  });

  const categories = [
    'Technology', 'Arts', 'Wellness', 'Food', 'Business', 
    'Sports', 'Education', 'Social', 'Professional', 'Hobbies'
  ];

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddRule = () => {
    setFormData({
      ...formData,
      rules: [...formData.rules, '']
    });
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData({ ...formData, rules: newRules });
  };

  const handleRemoveRule = (index) => {
    if (formData.rules.length > 1) {
      const newRules = formData.rules.filter((_, i) => i !== index);
      setFormData({ ...formData, rules: newRules });
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.category || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Community created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('HostMain')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Community</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <View style={styles.form}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Community Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter community name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your community"
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    formData.category === category && styles.categoryChipSelected
                  ]}
                  onPress={() => handleInputChange('category', category)}>
                  <Text style={[
                    styles.categoryChipText,
                    formData.category === category && styles.categoryChipTextSelected
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emirate *</Text>
            <View style={styles.emiratesGrid}>
              {emirates.map((emirate) => (
                <TouchableOpacity
                  key={emirate}
                  style={[
                    styles.emirateChip,
                    formData.emirate === emirate && styles.emirateChipSelected
                  ]}
                  onPress={() => handleInputChange('emirate', emirate)}>
                  <Text style={[
                    styles.emirateChipText,
                    formData.emirate === emirate && styles.emirateChipTextSelected
                  ]}>
                    {emirate}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Specific Location *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Dubai Marina, Downtown Dubai"
              value={formData.location}
              onChangeText={(text) => handleInputChange('location', text)}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Community Rules</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddRule}>
              <Icon name="add-circle" size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>
          
          {formData.rules.map((rule, index) => (
            <View key={index} style={styles.ruleInputContainer}>
              <TextInput
                style={styles.ruleInput}
                placeholder={`Rule ${index + 1}`}
                value={rule}
                onChangeText={(text) => handleRuleChange(index, text)}
              />
              {formData.rules.length > 1 && (
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveRule(index)}>
                  <Icon name="close-circle" size={20} color="#FF3B30" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Additional Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="lock-closed-outline" size={20} color="#666" />
              <View>
                <Text style={styles.settingLabel}>Private Community</Text>
                <Text style={styles.settingDescription}>Require approval to join</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <Text style={styles.toggleText}>Off</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="cash-outline" size={20} color="#666" />
              <View>
                <Text style={styles.settingLabel}>Membership Fee</Text>
                <Text style={styles.settingDescription}>Charge members to join</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <Text style={styles.toggleText}>Off</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient colors={['#FF6B35', '#FF8E53']} style={styles.submitGradient}>
            <Icon name="people" size={20} color="#FFF" />
            <Text style={styles.submitButtonText}>Create Community</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By creating a community, you agree to our Terms of Service and Community Guidelines.
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  categoryChip: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
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
  emiratesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  emirateChip: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    margin: 5,
  },
  emirateChipSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  emirateChipText: {
    color: '#FF6B35',
    fontSize: 12,
  },
  emirateChipTextSelected: {
    color: '#FFF',
  },
  ruleInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ruleInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
  },
  addButton: {
    padding: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    marginTop: 2,
  },
  toggleButton: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  toggleText: {
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

export default CreateCommunityScreen;