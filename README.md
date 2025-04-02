# Network Analyzer

Network Analyzer is a web application that provides real-time insights into network performance, including speed tests, security analysis, ISP details, and recommendations for optimizing your internet connection.

## 🚀 Features

- **Network Information**: Displays details about your current network (IP, ISP, connection type, etc.).
- **Speed Test**: Measures download and upload speeds using an interactive gauge.
- **Security Analysis**: Evaluates network security protocols and potential vulnerabilities.
- **ISP & Router Details**: Provides information about your ISP, router, and connection status.
- **Performance Recommendations**: Offers tips based on your network conditions.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for a smooth and responsive experience.

## 📸 Screenshot



## 🛠️ Technologies Used

- **React** & **Vite** for frontend development
- **TypeScript** for type safety
- **Framer Motion** for animations
- **Recharts** for visualizing network data
- **Axios** for API requests
- **Tailwind CSS** for styling

## 📦 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/bratzile/network-analyzer.git
cd network-analyzer
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start the Development Server

```sh
npm run dev
```

The app will run at: [http://localhost:5173](http://localhost:5173)

## 📂 Project Structure

```
network-analyzer/
├── src/
│   ├── components/       # Reusable UI components
│   ├── network/          # Network-related components
│   ├── security/         # Security-related components
│   ├── ui/               # UI-related utilities
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services for fetching network data
│   │   ├── network/
│   │   ├── api/
│   │   ├── speedTest/
│   │   ├── errors/
│   ├── utils/            # Helper functions and calculations
│   ├── types/            # TypeScript type definitions
│   ├── recommendations/  # Network and security recommendations
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point of the application
│   ├── index.css         # Global styles
├── public/
│   ├── index.html        # HTML template
├── package.json          # Project metadata & dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
```

## 🏗️ Build for Production

```sh
npm run build
```

## 🧪 Preview Build

```sh
npm run preview
```

## ❓ FAQ

### **1. How does the speed test work?**

The speed test fetches data from a test server and calculates upload/download speeds using a standard algorithm.

### **2. How does the security analysis work?**

The app checks your network security settings, including encryption protocols and potential vulnerabilities, providing recommendations to improve security.

### **3. Can I use this project for my own purposes?**

Yes! Feel free to fork the repo and modify it as needed.

### **4. How can I contribute?**

- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit your changes (`git commit -m "Added new feature"`)
- Push to the branch (`git push origin feature-branch`)
- Open a Pull Request

## ⭐ Support

If you find this project helpful, please give it a ⭐ on GitHub!

## 📜 License

MIT License © [bratzile](https://github.com/bratzile)

