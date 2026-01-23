# Figma Make Project

## Project Overview

This is a web application built with **React**, **Vite**, and **Tailwind CSS v4**, created using Figma Make. The project provides a modern, production-ready foundation with a comprehensive UI component library.

## Tech Stack

### Core Technologies
- **React** 18.3.1
- **Vite** 6.3.5 (Build tool)
- **Tailwind CSS** 4.1.12 (Styling)
- **TypeScript** (via Vite)

### UI Component Libraries
- **Radix UI** - Headless UI components for accessibility
- **Material-UI (MUI)** - Material Design components
- **Lucide React** - Icon library
- **Recharts** - Chart and graph visualizations

### Additional Libraries
- **Motion** (formerly Framer Motion) - Animation library
- **React Hook Form** - Form handling and validation
- **Sonner** - Toast notifications
- **React DnD** - Drag and drop functionality
- **React Slick** - Carousel components
- **React Responsive Masonry** - Masonry grid layouts
- **date-fns** - Date utilities
- **cmdk** - Command palette component

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main application component
│   │   └── components/
│   │       ├── figma/
│   │       │   └── ImageWithFallback.tsx    # Protected system component
│   │       └── ui/                          # UI component library
│   │           ├── accordion.tsx
│   │           ├── alert-dialog.tsx
│   │           ├── alert.tsx
│   │           ├── aspect-ratio.tsx
│   │           ├── avatar.tsx
│   │           ├── badge.tsx
│   │           ├── breadcrumb.tsx
│   │           ├── button.tsx
│   │           ├── calendar.tsx
│   │           ├── card.tsx
│   │           ├── carousel.tsx
│   │           ├── chart.tsx
│   │           ├── checkbox.tsx
│   │           ├── collapsible.tsx
│   │           ├── command.tsx
│   │           ├── context-menu.tsx
│   │           ├── dialog.tsx
│   │           ├── drawer.tsx
│   │           ├── dropdown-menu.tsx
│   │           ├── form.tsx
│   │           ├── hover-card.tsx
│   │           ├── input-otp.tsx
│   │           ├── input.tsx
│   │           ├── label.tsx
│   │           ├── menubar.tsx
│   │           ├── navigation-menu.tsx
│   │           ├── pagination.tsx
│   │           ├── popover.tsx
│   │           ├── progress.tsx
│   │           ├── radio-group.tsx
│   │           ├── resizable.tsx
│   │           ├── scroll-area.tsx
│   │           ├── select.tsx
│   │           ├── separator.tsx
│   │           ├── sheet.tsx
│   │           ├── sidebar.tsx
│   │           ├── skeleton.tsx
│   │           ├── slider.tsx
│   │           ├── sonner.tsx
│   │           ├── switch.tsx
│   │           ├── table.tsx
│   │           ├── tabs.tsx
│   │           ├── textarea.tsx
│   │           ├── toggle-group.tsx
│   │           ├── toggle.tsx
│   │           ├── tooltip.tsx
│   │           ├── use-mobile.ts
│   │           └── utils.ts
│   └── styles/
│       ├── fonts.css                        # Font imports
│       ├── index.css                        # Global styles
│       ├── tailwind.css                     # Tailwind directives
│       └── theme.css                        # Theme tokens and variables
├── guidelines/
│   └── Guidelines.md                        # Project guidelines
├── package.json                             # Dependencies and scripts
├── vite.config.ts                           # Vite configuration
├── postcss.config.mjs                       # PostCSS configuration
└── README.md                                # This file
```

## Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- pnpm, npm, or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

### Development

Start the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### Building for Production

Build the application:
```bash
npm run build
# or
pnpm build
# or
yarn build
```

## Import Aliases

The project uses Vite's path aliasing feature:

- `@` is mapped to the `/src` directory

Example:
```typescript
import { Button } from "@/app/components/ui/button";
import App from "@/app/App";
```

## Styling Guidelines

### Tailwind CSS v4

This project uses **Tailwind CSS v4.0**. Key points:

- Use inline Tailwind classes for styling
- Theme tokens are defined in `/src/styles/theme.css`
- Do not create a `tailwind.config.js` file (Tailwind v4 uses CSS-based configuration)
- Avoid using Tailwind classes for font-size, font-weight, or line-height unless specifically needed

### Font Imports

- All font imports must be added to `/src/styles/fonts.css`
- Add font imports at the top of the file
- Do not add font imports in other CSS files

## Component Guidelines

### Creating New Components

1. Place custom components in `/src/app/components/`
2. Use the `@` alias for imports
3. Components must be `.tsx` files
4. Always provide unique `key` props for list items

Example:
```typescript
import { ComponentName } from "@/app/components/component-name";
```

### Protected Files

These system files should **NOT** be modified:
- `/src/app/components/figma/ImageWithFallback.tsx`

### UI Component Library

The project includes a comprehensive UI component library in `/src/app/components/ui/`. These components are built with:
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **TypeScript** for type safety

Available components include: Accordion, Alert Dialog, Avatar, Badge, Button, Card, Carousel, Chart, Checkbox, Dialog, Dropdown Menu, Form, Input, Select, Table, Tabs, and many more.

## Working with Images

### Raster Images (PNG, JPG)
Use the `figma:asset` virtual module scheme:
```typescript
import img from "figma:asset/abc123.png"
```
**Important:** Do not prefix with `./` or `../`

### SVG Vector Graphics
Import from the `/src/imports` directory:
```typescript
import svgPaths from "@/imports/svg-wg56ef214f"
```

### Creating New Images
Use the `ImageWithFallback` component:
```typescript
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

<ImageWithFallback src="image-url.jpg" alt="Description" />
```

## Recommended Libraries by Use Case

### Icons
- **lucide-react** - Modern, consistent icon set

### Charts & Graphs
- **recharts** - Composable charting library

### Animations
- **motion/react** (formerly Framer Motion) - Powerful animation library
```typescript
import { motion } from "motion/react"
```

### Forms
- **react-hook-form@7.55.0** - Performant form validation

### UI Interactions
- **Carousels:** react-slick
- **Drag & Drop:** react-dnd + react-dnd-html5-backend
- **Masonry Grids:** react-responsive-masonry
- **Popovers/Positioning:** @popperjs/core + react-popper

### Notifications
- **sonner** - Beautiful toast notifications
```typescript
import { toast } from "sonner"
```

## Key Features

### Responsive Design
- The application is designed to be responsive by default
- Use the `use-mobile` hook for responsive behavior detection

### Accessibility
- Components built with Radix UI primitives ensure accessibility compliance
- Proper ARIA attributes and keyboard navigation support

### Theme Support
- Theme variables defined in `/src/styles/theme.css`
- Supports customizable design tokens

## Development Best Practices

1. **Component Organization:** Keep components modular and reusable
2. **Type Safety:** Leverage TypeScript for better development experience
3. **Styling:** Use Tailwind utility classes for consistent styling
4. **State Management:** Use React hooks for local state
5. **Form Handling:** Use react-hook-form for complex forms
6. **Code Quality:** Follow React best practices and hooks rules

## Package Installation

Before using any external package:
1. Check if it's already in `package.json`
2. Install using your package manager if needed
3. Some packages require specific versions (check library documentation)

### Special Installation Notes

**Material-UI (@mui/material):**
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

**Ant Design (antd):**
```bash
npm install antd @ant-design/icons @ant-design/colors
```

## Browser Support

Modern browsers with ES6+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

**Import Errors:**
- Always use the `@` alias for imports from `/src`
- Check that paths are correct and files exist

**Styling Issues:**
- Ensure Tailwind CSS classes are spelled correctly
- Check `/src/styles/theme.css` for available theme tokens

**Package Errors:**
- Clear node_modules and reinstall
- Check for peer dependency warnings

## Contributing

When adding new features:
1. Create components in `/src/app/components/`
2. Update this README if adding major features
3. Follow existing code style and patterns
4. Test responsive behavior

## Project Information

- **Version:** 0.0.1
- **Created:** January 20, 2026
- **Build Tool:** Vite 6.3.5
- **Framework:** React 18.3.1

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Motion Documentation](https://motion.dev/)

## License

Private project - All rights reserved

---

**Last Updated:** January 20, 2026
