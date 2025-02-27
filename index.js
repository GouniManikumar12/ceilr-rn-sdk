import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

class CeilR {
  static apiKey = null;
  static customerId = null;
  static endpoint = 'https://api.ceilr.com';
  static offlineQueue = [];
  static isOnline = true;

  static async init(apiKey, customerId) {
    this.apiKey = apiKey;
    this.customerId = customerId;
    
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected;
      if (this.isOnline) {
        this.processOfflineQueue();
      }
    });
  }

  static async checkFeature(featureName) {
    try {
      const response = await this.request('/check-feature', { featureName });
      return response.data.allowed;
    } catch (error) {
      console.error('CeilR Error:', error);
      return false;
    }
  }

  static async trackUsage(featureName, count = 1) {
    await this.request('/track-usage', { featureName, count });
  }

  static async getUserEntitlements() {
    try {
      const response = await this.request('/user-entitlements');
      return response.data.entitlements;
    } catch (error) {
      console.error('CeilR Error:', error);
      return [];
    }
  }

  static async request(endpoint, data = {}) {
    const payload = {
      apiKey: this.apiKey,
      customerId: this.customerId,
      ...data,
    };
    
    if (!this.isOnline) {
      this.offlineQueue.push({ endpoint, payload });
      await AsyncStorage.setItem('CeilR_OfflineQueue', JSON.stringify(this.offlineQueue));
      return;
    }

    try {
      const response = await axios.post(`${this.endpoint}${endpoint}`, payload);
      return response;
    } catch (error) {
      console.error('CeilR API Request Failed:', error);
      return null;
    }
  }

  static async processOfflineQueue() {
    const storedQueue = await AsyncStorage.getItem('CeilR_OfflineQueue');
    if (storedQueue) {
      this.offlineQueue = JSON.parse(storedQueue);
      while (this.offlineQueue.length > 0) {
        const { endpoint, payload } = this.offlineQueue.shift();
        try {
          await axios.post(`${this.endpoint}${endpoint}`, payload);
        } catch (error) {
          console.error('CeilR Offline Request Failed:', error);
          this.offlineQueue.unshift({ endpoint, payload });
          break;
        }
      }
      await AsyncStorage.setItem('CeilR_OfflineQueue', JSON.stringify(this.offlineQueue));
    }
  }
}

export default CeilR;
