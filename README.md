# CeilR React Native SDK (`ceilr-rn-sdk`)

🚀 **CeilR SDK** is a React Native library for feature access management, usage tracking, and entitlement fetching.

## 📦 Installation

Install the package in your React Native project:

```sh
npm install ceilr-rn-sdk
```

## 🛠️ Setup

Initialize the SDK in your app:

```javascript
import CeilR from 'ceilr-rn-sdk';

CeilR.init('your-api-key', 'customer-id');
```

## 🚀 Features

### ✅ **Check Feature Access**
```javascript
const hasAccess = await CeilR.checkFeature('premium_feature');
console.log('Feature Access:', hasAccess);
```

### 📊 **Track Usage**
```javascript
await CeilR.trackUsage('api_calls', 1);
```

### 🔑 **Get User Entitlements**
```javascript
const entitlements = await CeilR.getUserEntitlements();
console.log('User Entitlements:', entitlements);
```

## 📡 Offline Support
- Requests are **queued when offline** and retried when the device is back online.

## 🔄 Updating the SDK
To update to the latest version:

```sh
npm update ceilr-rn-sdk
```

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to GitHub (`git push origin feature-name`)
5. Open a Pull Request 🚀

## 📜 License
This project is licensed under the **MIT License**.