# AI Portfolio Builder

An intelligent web application that automatically generates beautiful, professional portfolio websites based on user input. Built with modern web technologies and featuring a sleek, gradient-based design.

## Features

### 🎨 Modern Design System
- Gradient-based color scheme with purple/blue accents
- Glassmorphism effects and smooth animations
- Fully responsive design for all devices
- Professional typography and spacing

### 📝 Multi-Step Form Builder
- **Step 1: Personal Information** - Collect name, title, and bio
- **Step 2: Work Experience** - Add multiple work experiences with details
- **Step 3: Skills & Projects** - Showcase technical skills and projects
- **Step 4: Contact Information** - Add email, phone, and social media links

### 🚀 Live Portfolio Preview
- Real-time portfolio generation
- Beautiful hero section with gradient backgrounds
- Experience timeline with company details
- Skills showcase with badges
- Project cards with technologies and links
- Contact section with social media integration

### 💾 Data Persistence
- LocalStorage integration for saving portfolio data
- Easy editing and regeneration of portfolios
- Export functionality for sharing

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui component library
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone 
cd ai-portfolio-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Builder.tsx      # Multi-step form component
│   └── PortfolioPreview.tsx  # Portfolio preview component
├── pages/
│   ├── Index.tsx        # Home page (builder)
│   ├── Preview.tsx      # Portfolio preview page
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx             # Main app component
├── index.css           # Global styles and design tokens
└── main.tsx            # App entry point
```

## Design System

The application uses a comprehensive design system defined in `src/index.css`:

### Color Palette
- **Primary**: Purple gradient (`hsl(262 83% 58%)`)
- **Secondary**: Blue accent (`hsl(217 91% 60%)`)
- **Background**: Light gray with subtle gradients
- **Custom Gradients**: Multiple gradient definitions for modern effects

### Design Tokens
- Custom CSS variables for colors, shadows, and transitions
- Consistent spacing and border radius
- Smooth transitions with cubic-bezier easing

## Key Features Explained

### 1. Multi-Step Form
The builder uses a 4-step process to collect user information:
- Visual progress indicator with icons
- Form validation for required fields
- Add/remove functionality for projects and experiences
- Smooth navigation between steps

### 2. Portfolio Generation
- Instant portfolio preview generation
- Responsive layout adapting to content
- Conditional sections (only show filled sections)
- Professional styling matching modern portfolio standards

### 3. Export & Share
- Download portfolio as HTML (planned)
- Share link generation (planned)
- Edit and regenerate functionality

## Customization

### Modifying the Design System

Edit `src/index.css` to change:
- Color schemes
- Gradients
- Typography
- Spacing
- Animations

### Adding New Sections

1. Update the `PortfolioData` interface in `Builder.tsx`
2. Add form fields in the appropriate step
3. Update the preview component to display the new section

## Future Enhancements

- [ ] AI-powered content enhancement using Lovable AI
- [ ] Multiple portfolio templates/themes
- [ ] PDF export functionality
- [ ] Custom domain support
- [ ] Backend integration for saving portfolios
- [ ] User authentication
- [ ] Portfolio analytics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.


## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

