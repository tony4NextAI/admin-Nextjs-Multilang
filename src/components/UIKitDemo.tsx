'use client';

import React, { useState } from 'react';
import {
  Container,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Select,
  Modal,
  Spinner
} from './ui';

const UIKitDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  ];

  return (
    <Container className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UI Kit Demo</h1>
        <p className="text-gray-600">Comprehensive showcase of all UI components following the Ynex design system.</p>
      </div>

      {/* Buttons Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Buttons</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">States</h3>
            <div className="flex flex-wrap gap-2">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Inputs Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Form Controls</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Default Input"
              placeholder="Enter text..."
              helperText="This is a helper text"
            />
            <Input
              label="Input with Error"
              placeholder="Enter text..."
              error="This field is required"
            />
            <Input
              label="Input with Left Icon"
              placeholder="Search..."
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            <Input
              label="Input with Right Icon"
              placeholder="Enter email..."
              type="email"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input variant="default" placeholder="Default variant" />
            <Input variant="filled" placeholder="Filled variant" />
            <Input variant="outlined" placeholder="Outlined variant" />
          </div>
          <Select
            label="Select Example"
            options={selectOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Choose an option..."
          />
        </CardBody>
      </Card>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Badges</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Avatars Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Avatars</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar size="xs" fallback="XS" />
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" />
              <Avatar size="lg" fallback="LG" />
              <Avatar size="xl" fallback="XL" />
              <Avatar size="2xl" fallback="2XL" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">With Images</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                alt="User 1" 
                fallback="U1" 
              />
              <Avatar 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                alt="User 2" 
                fallback="U2" 
              />
              <Avatar fallback="JD" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Table</h2>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead sortable>Name</TableHead>
                <TableHead sortable>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((user) => (
                <TableRow key={user.id} onClick={() => console.log('Clicked user:', user.id)}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar fallback={user.name.split(' ').map(n => n[0]).join('')} size="sm" />
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'primary' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default">
          <CardHeader>
            <h3 className="text-lg font-medium">Default Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">This is a default card with border and subtle shadow.</p>
          </CardBody>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <h3 className="text-lg font-medium">Elevated Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">This is an elevated card with more prominent shadow.</p>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="outline">Action</Button>
          </CardFooter>
        </Card>

        <Card variant="outlined">
          <CardHeader>
            <h3 className="text-lg font-medium">Outlined Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">This is an outlined card with thicker border.</p>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="ghost">Action</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Modal and Spinner Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Modal & Spinner</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Modal</h3>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Spinners</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Spinner size="xs" />
                <span className="text-sm">Extra Small</span>
              </div>
              <div className="flex items-center space-x-2">
                <Spinner size="sm" />
                <span className="text-sm">Small</span>
              </div>
              <div className="flex items-center space-x-2">
                <Spinner size="md" />
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <Spinner size="lg" />
                <span className="text-sm">Large</span>
              </div>
              <div className="flex items-center space-x-2">
                <Spinner size="xl" />
                <span className="text-sm">Extra Large</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Spinner color="primary" />
              <Spinner color="secondary" />
              <Spinner color="gray" />
              <div className="bg-gray-800 p-2 rounded">
                <Spinner color="white" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This is an example modal dialog. It includes a backdrop, escape key handling, 
            and prevents body scrolling when open.
          </p>
          <Input label="Example Input" placeholder="Type something..." />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default UIKitDemo; 