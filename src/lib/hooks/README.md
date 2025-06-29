# React Query Hooks Documentation

This directory contains custom React Query hooks for API data fetching with automatic authentication, caching, and error handling.

## Available Hooks

### 1. `useUsers` Hook

Fetches user account data from the API.

**API Endpoint:** `POST /api/admin/user/list`

**Data Structure:**
```typescript
interface User {
  _id: string;
  account: string;
  bank: string;
  amount: number;
  __v?: number;
}
```

**Usage:**
```typescript
import { useUsers } from '@/lib/hooks/useUsers';

function UsersComponent() {
  const { data, isLoading, error } = useUsers();
  
  // data structure:
  // {
  //   data: { success: boolean, result: { data: User[], total, totalPages, page, limit } },
  //   isLoading: boolean,
  //   error: Error | null
  // }
  
  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const users = data?.result?.data || [];
  return (
    <div>
      {users.map(user => (
        <div key={user._id}>
          Account: {user.account} - Bank: {user.bank} - Amount: {user.amount}
        </div>
      ))}
    </div>
  );
}
```

### 2. `useTransactions` Hook

Fetches transaction history data from the API.

**API Endpoint:** `POST /api/admin/transaction/list`

**Data Structure:**
```typescript
interface Transaction {
  _id: string;
  amount: number;
  status: string;
  message: string;
  type: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
```

**Usage:**
```typescript
import { useTransactions } from '@/lib/hooks/useTransactions';

function TransactionsComponent() {
  const { data, isLoading, error } = useTransactions();
  
  // data structure:
  // {
  //   data: { success: boolean, result: { data: Transaction[], total, totalPages, page, limit } },
  //   isLoading: boolean,
  //   error: Error | null
  // }
  
  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const transactions = data?.result?.data || [];
  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction._id}>
          {transaction.type}: {transaction.amount} VND - Status: {transaction.status}
        </div>
      ))}
    </div>
  );
}
```

## Features

### 🔐 **Automatic Authentication**
- Both hooks automatically handle authentication using NextAuth session
- Requests include Bearer token in Authorization header
- Only run when user is authenticated (`status === "authenticated"`)

### ⚡ **React Query Benefits**
- **Caching:** Data is cached for 15 minutes (900,000ms)
- **Background Refetching:** Automatic revalidation every 15 minutes
- **Error Handling:** Built-in error states and retry logic (3 attempts)
- **Loading States:** Automatic loading state management
- **Window Focus Refetch:** Refetches when window regains focus
- **Network Reconnect:** Refetches when network reconnects

### 📊 **DataTable Integration**
Both hooks are designed to work seamlessly with the enhanced DataTable component:

```typescript
import { DataTable } from '@/components/ui/Table';
import { useUsers } from '@/lib/hooks/useUsers';

function UsersTable() {
  const apiData = useUsers();
  
  // Transform data for DataTable
  const transformedData = {
    data: apiData.data ? {
      success: apiData.data.success,
      result: apiData.data.result
    } : null,
    isLoading: apiData.isLoading,
    error: apiData.error
  };
  
  return (
    <DataTable
      apiData={transformedData}
      columns={columns}
      showPageSizeSelector={true}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
}
```

## Configuration

### Default Query Parameters

**useUsers:**
```typescript
{
  page: 1,
  limit: 10,
  filterBy: "",
  sortBy: { amount: -1 }
}
```

**useTransactions:**
```typescript
{
  page: 1,
  limit: 10,
  filterBy: "",
  sortBy: { createdAt: -1 }
}
```

### React Query Settings
- **Query Key:** `["users"]` / `["transactions"]`
- **Stale Time:** 15 minutes (900,000ms)
- **Retry:** 3 attempts on failure
- **Enabled:** Only when authenticated
- **Refetch on Window Focus:** Yes
- **Refetch on Reconnect:** Yes

## Error Handling

Both hooks provide comprehensive error handling:

```typescript
const { data, isLoading, error } = useUsers();

if (error) {
  // error.message contains the error description
  // Common errors:
  // - "Authentication required but no valid session found"
  // - "HTTP 401: Unauthorized"
  // - "HTTP 500: Internal Server Error"
  // - Network errors
}
```

## API Response Format

Both hooks expect this standardized API response format:

```typescript
{
  "success": boolean,
  "result": {
    "data": Array<T>,     // Array of users or transactions
    "total": number,      // Total number of records
    "totalPages": number, // Total pages available
    "page": number,       // Current page
    "limit": number       // Items per page
  },
  "error": {              // Optional error object
    "status": number,
    "code": string,
    "message": string
  }
}
```

## Example API Responses

### Users API Response:
```json
{
  "success": true,
  "result": {
    "data": [
      {
        "_id": "685f79274a17621ad94773aa",
        "account": "6666",
        "bank": "VCB",
        "amount": 9500,
        "__v": 0
      }
    ],
    "total": 1,
    "totalPages": 1,
    "page": 1,
    "limit": 10
  }
}
```

### Transactions API Response:
```json
{
  "success": true,
  "result": {
    "data": [
      {
        "_id": "685f74b1c9616af3ed704191",
        "amount": 5000,
        "status": "unknow",
        "message": "469215.210625.131807.DANG THANH DUNG transfer",
        "type": "deposit",
        "time": "2025-06-21T11:18:07.000Z",
        "createdAt": "2025-06-28T04:50:57.402Z",
        "updatedAt": "2025-06-28T04:50:57.402Z",
        "__v": 0
      }
    ],
    "total": 1,
    "totalPages": 1,
    "page": 1,
    "limit": 10
  }
}
``` 