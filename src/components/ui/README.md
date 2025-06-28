# UI Kit Components

A comprehensive collection of reusable UI components built with React, TypeScript, and Tailwind CSS, following the Ynex design system.

## Features

- 🎨 **Consistent Design**: All components follow the Ynex design system
- 🔧 **TypeScript Support**: Full TypeScript support with proper type definitions
- 🎯 **Accessible**: Built with accessibility best practices
- 📱 **Responsive**: Mobile-first responsive design
- 🎭 **Customizable**: Easy to customize with Tailwind CSS classes
- ⚡ **Performance**: Optimized for performance with minimal bundle size

## Installation

The components require the following dependencies:

```bash
npm install clsx tailwind-merge
```

## Components

### Container

A responsive container component with predefined max-widths.

```tsx
import { Container } from '@/components/ui';

<Container size="lg" className="py-8">
  Content goes here
</Container>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'xl')
- `className`: string
- `children`: React.ReactNode

### Button

A versatile button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `loading`: boolean (default: false)
- `disabled`: boolean
- `className`: string
- `children`: React.ReactNode

### Input

A flexible input component with icons, labels, and error states.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  placeholder="Enter your email"
  type="email"
  error="Invalid email format"
  leftIcon={<SearchIcon />}
  variant="default"
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode
- `variant`: 'default' | 'filled' | 'outlined' (default: 'default')
- `className`: string

### Card

A flexible card component with header, body, and footer sections.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui';

<Card variant="elevated">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Card Props:**
- `variant`: 'default' | 'elevated' | 'outlined' (default: 'default')
- `className`: string
- `children`: React.ReactNode

### Badge

A small status indicator component.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="success" size="md">
  Active
</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: string
- `children`: React.ReactNode

### Avatar

A user avatar component with fallback support.

```tsx
import { Avatar } from '@/components/ui';

<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
  fallback="JD"
  size="md"
/>
```

**Props:**
- `src`: string
- `alt`: string
- `fallback`: string
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
- `className`: string

### Table

A comprehensive table component with sorting support.

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead sortable onSort={() => handleSort('name')}>
        Name
      </TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow onClick={() => handleRowClick()}>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Table Props:**
- `variant`: 'default' | 'striped' | 'bordered' (default: 'default')
- `className`: string
- `children`: React.ReactNode

**TableHead Props:**
- `sortable`: boolean (default: false)
- `onSort`: () => void
- `className`: string
- `children`: React.ReactNode

### Select

A custom select dropdown component.

```tsx
import { Select } from '@/components/ui';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

<Select
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Choose an option"
  label="Select Option"
/>
```

**Props:**
- `options`: Array<{ value: string, label: string, disabled?: boolean }>
- `value`: string
- `onChange`: (value: string) => void
- `placeholder`: string (default: 'Select an option')
- `label`: string
- `error`: string
- `disabled`: boolean (default: false)
- `className`: string

### Modal

A modal dialog component with backdrop and keyboard support.

```tsx
import { Modal } from '@/components/ui';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'md')
- `className`: string
- `children`: React.ReactNode

### Spinner

A loading spinner component.

```tsx
import { Spinner } from '@/components/ui';

<Spinner size="md" color="primary" />
```

**Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `color`: 'primary' | 'secondary' | 'white' | 'gray' (default: 'primary')
- `className`: string

## Color Scheme

The components use a consistent color scheme based on the Ynex design system:

- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#7c3aed)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#dc2626)
- **Info**: Cyan (#0891b2)
- **Gray**: Various shades for neutral elements

## Customization

All components accept a `className` prop for additional styling. The components use the `cn()` utility function which combines `clsx` and `tailwind-merge` for optimal class name handling.

```tsx
<Button className="w-full mt-4 shadow-lg">
  Custom Button
</Button>
```

## Usage Examples

Check out the `UIKitDemo` component for comprehensive examples of all components in action.

## Best Practices

1. **Consistent Spacing**: Use Tailwind's spacing scale for consistent margins and padding
2. **Color Usage**: Stick to the defined color variants for consistency
3. **Accessibility**: Always provide proper labels and alt text
4. **Responsive Design**: Test components across different screen sizes
5. **Performance**: Import only the components you need

## Contributing

When adding new components:

1. Follow the existing TypeScript patterns
2. Include proper prop types and defaults
3. Add the component to the index.ts file
4. Update this documentation
5. Test across different browsers and devices 