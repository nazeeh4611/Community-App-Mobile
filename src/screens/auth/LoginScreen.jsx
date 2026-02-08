import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
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
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Dubai Communities</Text>
            <Text style={styles.subtitle}>Connect with like-minded people in Dubai</Text>
          </View>

          <View style={styles.form}>
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.roleSelector}>
              <Text style={styles.roleText}>Login as:</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity 
                  style={[styles.roleButton, role === 'user' && styles.roleButtonActive]} 
                  onPress={() => setRole('user')}
                  activeOpacity={0.7}>
                  <Text style={styles.roleButtonEmoji}>👤</Text>
                  <Text style={[styles.roleButtonText, role === 'user' && styles.roleButtonTextActive]}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.roleButton, role === 'host' && styles.roleButtonActive]} 
                  onPress={() => setRole('host')}
                  activeOpacity={0.7}>
                  <Text style={styles.roleButtonEmoji}>🏢</Text>
                  <Text style={[styles.roleButtonText, role === 'host' && styles.roleButtonTextActive]}>Host</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerContainer}>
              <Text style={styles.registerText}>
                Don't have an account? <Text style={styles.registerTextBold}>Register</Text>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    textAlign: 'center',
    paddingHorizontal: 20,
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
    marginBottom: 14,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#FF6B35',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  roleSelector: {
    alignItems: 'center',
    marginBottom: 16,
  },
  roleText: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  roleButton: {
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
  roleButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  roleButtonEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  roleButtonText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 14,
  },
  roleButtonTextActive: {
    color: '#FFF',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
  },
  registerTextBold: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
});

export default LoginScreen;