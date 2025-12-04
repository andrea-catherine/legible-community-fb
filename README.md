# EIA Community Feedback Management

A TypeScript-based prototype for managing community feedback during Environmental Impact Assessment (EIA) processes, focused on the Iceland market.

🌐 **Live Deployment:** https://legible-community-fb.pages.dev/

## 🚀 Features

### Core Functionality

- **Comment Management**
  - Comment intake and organization
  - Automatic categorization by type, environmental category, and stakeholder type
  - Status tracking (pending, assigned, draft response, final)
  - Search and filtering capabilities
  - Response author tracking
  - Public meeting flagging

- **Stakeholder Management**
  - Database of mandatory commenters
  - Submission tracking and deadlines
  - Reminder system preparation
  - Historical comment tracking

- **Project Dashboard**
  - Key metrics and overview
  - Comment period tracking
  - Response completeness metrics
  - Timeline view with "What's Next"
  - Topics organization with mitigation strategies

- **Advanced Features**
  - Timeline visualization with milestones
  - Public meeting management
  - Mitigation strategy mapping to comments
  - Comments organized by environmental topics
  - Project comparison

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Modern styling
- **Lucide React** - Icon library
- **date-fns** - Date utilities

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build in the `.next` folder.

## 🏗️ Project Structure

```
community-feedback/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard/home page
│   ├── comments/          # Comment management pages
│   ├── projects/          # Project pages (detail, timeline, topics)
│   ├── stakeholders/      # Stakeholder pages
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Layout.tsx         # Main layout with sidebar
│   └── Sidebar.tsx        # Navigation sidebar
├── lib/                   # Utility functions
│   └── store.ts           # Data store (localStorage for prototype)
├── types/                 # TypeScript type definitions
│   └── index.ts           # Core data types
├── public/                # Static assets (if any)
└── package.json
```

## 📊 Data Structure

See `UML_DATA_STRUCTURE.md` for complete data model documentation with UML diagrams.

Key entities:
- **Project** - Central entity for EIA projects
- **Comment** - Community feedback
- **Stakeholder** - Comment submitters
- **MitigationStrategy** - Actions addressing concerns
- **TimelineEvent** - Project milestones
- **PublicMeeting** - Community meetings

## 🌐 Deployment

### Deploying to CloudFront (via S3)

1. **Build the static export:**

   ```bash
   npm run build
   ```

2. **Export static files:**

   Update `next.config.js` to enable static export:
   
   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   
   module.exports = nextConfig
   ```

   Then rebuild:
   ```bash
   npm run build
   ```

   This will create an `out/` directory with static files.

3. **Upload to S3:**

   ```bash
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

4. **Configure CloudFront:**

   - Point CloudFront distribution to your S3 bucket
   - Set default root object to `index.html`
   - Configure error pages (404 → `/404.html`, etc.)
   - Enable compression
   - Set up custom domain (optional)

### Deploying to Vercel (Alternative)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

Vercel is optimized for Next.js and handles builds automatically.

## 📝 Current Status

This is a playable prototype with sample data. The data is stored in browser localStorage for demonstration purposes.

### Sample Projects

1. **Búrfellslundur/Vaðölduver Wind Farm**
   - 28-30 turbines, 120 MW
   - Status: Public Comment Phase
   - Developer: Landsvirkjun

2. **Hafið Wind Farm Project**
   - 15-18 turbines, 75 MW offshore
   - Status: Scoping Phase
   - Developer: Orkubú Vestfjarða

## 🔮 Future Enhancements

- API integration with Skipulagsgátt
- Response workflow interface
- Duplicate detection and merging
- Reporting and export functionality
- User authentication and permissions
- Multi-language support (Icelandic/English)
- Public comment submission form
- Email notifications
- Document library
- See `COMMUNITY_FEATURES.md` for comprehensive list

## 📚 Documentation

- `UML_DATA_STRUCTURE.md` - Complete data model with UML diagrams
- `COMMUNITY_FEATURES.md` - Feature suggestions for community engagement
- `QUICK_START.md` - Quick start guide
- `DESIGN_UPDATE.md` - Design system documentation

## 📄 License

This is a prototype project. See license information as needed.

## 🤝 Contributing

This is currently a prototype. Contributions and feedback welcome!

## 📧 Contact

For questions about the EIA Community Feedback Management system, please contact the development team.
