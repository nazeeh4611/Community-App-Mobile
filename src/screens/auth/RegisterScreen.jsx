import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (role === 'user') {
      navigation.navigate('Main');
    } else if (role === 'host') {
      navigation.navigate('HostMain');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Dubai Communities</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📱</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number (Optional)"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✅</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.roleSelector}>
              <Text style={styles.roleLabel}>Register as:</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity 
                  style={[styles.roleOption, role === 'user' && styles.roleOptionActive]} 
                  onPress={() => setRole('user')}
                  activeOpacity={0.7}>
                  <Text style={styles.roleButtonEmoji}>👤</Text>
                  <Text style={[styles.roleOptionText, role === 'user' && styles.roleOptionTextActive]}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.roleOption, role === 'host' && styles.roleOptionActive]} 
                  onPress={() => setRole('host')}
                  activeOpacity={0.7}>
                  <Text style={styles.roleButtonEmoji}>🏢</Text>
                  <Text style={[styles.roleOptionText, role === 'host' && styles.roleOptionTextActive]}>Host</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By registering, you agree to our{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text>
              </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginTextBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#FFE5B4',
    height: 52,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  roleSelector: {
    marginTop: 6,
    marginBottom: 18,
  },
  roleLabel: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5B4',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    borderWidth: 1.5,
    borderColor: '#FFE5B4',
  },
  roleOptionActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  roleButtonEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  roleOptionText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 14,
  },
  roleOptionTextActive: {
    color: '#FFF',
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  termsContainer: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  termsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 11,
    lineHeight: 16,
  },
  termsLink: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  loginText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
  },
  loginTextBold: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;