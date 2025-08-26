# Metal Price Tracker

A modern, real-time precious metal price tracking application built with React and TypeScript. Track live prices for Gold, Silver, and Platinum with beautiful, responsive UI and detailed market data.

## 🌟 Features

- **Real-time Price Tracking**: Live prices for Gold (XAU), Silver (XAG), and Platinum (XPT)
- **Detailed Market Data**: Current prices, previous close, previous open, and last updated timestamps
- **Responsive Design**: Beautiful, mobile-friendly interface with dark/light mode support
- **Auto-refresh**: Prices update automatically every minute
- **Error Handling**: Graceful handling of API failures with retry functionality
- **Navigation**: Detailed view for each metal with comprehensive price information
- **Mobile Ready**: Configured for iOS/Android deployment via Capacitor

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Navigation**: React Router DOM
- **Backend**: Supabase integration ready
- **Mobile**: Capacitor for native iOS/Android apps
- **State Management**: Custom React hooks
- **Icons**: Lucide React

## 📱 Screenshots

The app features a clean, modern interface with:
- Landing page showing all three metals in a responsive grid
- Individual detail pages for each metal
- Beautiful gradient backgrounds and glass morphism effects
- Loading states and error handling
- Toast notifications for user feedback

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Web Application

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd metal-price-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Mobile App (iOS/Android)

1. **Install Capacitor CLI globally**
   ```bash
   npm install -g @capacitor/cli
   ```

2. **Add mobile platforms**
   ```bash
   npx cap add ios
   npx cap add android
   ```

3. **Build and sync**
   ```bash
   npm run build
   npx cap sync
   ```

4. **Run on device/simulator**
   ```bash
   npx cap run ios
   npx cap run android
   ```

## 🔧 Configuration

### API Integration

Currently uses mock data for demonstration. To connect to real metal prices:

1. **Option 1: Metals API (Recommended)**
   - Get API key from [metals-api.com](https://metals-api.com)
   - Set up Supabase Edge Function to securely fetch data
   - Update `src/services/metalApi.ts` with real API endpoints

2. **Option 2: Alternative APIs**
   - Precious Metals API
   - Alpha Vantage
   - Financial Modeling Prep

### Environment Variables

Create `.env.local` for additional configuration:
```env
VITE_API_REFRESH_INTERVAL=60000
VITE_ENABLE_AUTO_REFRESH=true
```

## 📊 API Data Structure

The app expects metal price data in this format:
```typescript
interface MetalPrice {
  current: number;           // Current price in USD
  previousClose: number;     // Previous close price
  previousOpen: number;      // Previous open price
  lastUpdated: string;       // ISO timestamp
}

interface MetalPrices {
  gold: MetalPrice;
  silver: MetalPrice;
  platinum: MetalPrice;
}
```

## 🎨 Customization

### Design System

The app uses a comprehensive design system with semantic tokens:
- Custom color palette with HSL values
- Gradient backgrounds and glass morphism effects
- Consistent spacing and typography
- Dark/light mode support

### Adding New Metals

To add additional metals (e.g., Palladium, Copper):

1. Update `MetalPrices` interface in `src/services/metalApi.ts`
2. Add new metal card to landing page
3. Create route and detail page
4. Update API service to fetch new metal data

## 📱 Mobile Features

- Native iOS/Android app support via Capacitor
- Optimized touch interactions
- Native navigation patterns
- Device-specific optimizations

## 🔒 Security

- API keys secured via backend integration
- No sensitive data stored in frontend
- HTTPS required for production
- Supabase integration for secure data handling

## 📈 Performance

- Lazy loading for optimal performance
- Efficient state management
- Optimized bundle size
- Progressive Web App features

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🚀 Deployment

### Web Deployment

Deploy to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Supabase Hosting

### Mobile App Store

1. Build production app via Capacitor
2. Follow platform-specific store guidelines
3. Submit to App Store / Google Play

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

## 🔮 Roadmap

- [ ] Real API integration
- [ ] Price alerts and notifications
- [ ] Historical price charts
- [ ] Portfolio tracking
- [ ] Price prediction features
- [ ] Additional metals support
- [ ] Advanced analytics

---

**Metal Price Tracker** - Stay informed with real-time precious metal market data 📈✨