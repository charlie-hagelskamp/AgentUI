# Call Center Agent UI

A modern call center interface built with React, TypeScript, and Mantine UI components.

## 🚀 Features

- **Real-time Agent Status Updates** - Live status indicators for all team members
- **Agent-to-Agent Chat** - Instant consultation with other agents
- **Modern Call Interface** - Professional call controls and customer management
- **Responsive Design** - Works across different screen sizes

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/charlie-hagelskamp/AgentUI.git
   cd AgentUI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠 Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Mantine** - UI Component Library
- **Vite** - Build Tool
- **Supabase** - Real-time Database (ready for integration)

## 📦 Project Structure

```
src/
├── CallCenterUI.tsx    # Main UI component
├── App.tsx            # App wrapper
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🔗 Real-time Features

The app includes two live features:

1. **Agent Status Panel** - Updates every 3 seconds showing team availability
2. **Agent Chat** - Click any agent's chat button to start a consultation

## 🚀 Next Steps

- Connect to Supabase for persistent real-time data
- Add authentication
- Implement call routing logic
- Add more customer interaction features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
