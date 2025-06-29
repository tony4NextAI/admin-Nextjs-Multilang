import { useQuery } from '@tanstack/react-query';

// Mock API function - replace with your actual API call
const fetchUsers = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data - replace with actual API call
  return [
    { id: 1, account: 'ACC001', bank: 'Vietcombank', amount: 15000000, createdAt: '2024-01-15' },
    { id: 2, account: 'ACC002', bank: 'BIDV', amount: 8500000, createdAt: '2024-01-14' },
    { id: 3, account: 'ACC003', bank: 'Techcombank', amount: 12000000, createdAt: '2024-01-13' },
    { id: 4, account: 'ACC004', bank: 'VPBank', amount: 6750000, createdAt: '2024-01-12' },
    { id: 5, account: 'ACC005', bank: 'ACB', amount: 9200000, createdAt: '2024-01-11' },
  ];
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    // This will override the global staleTime for this specific query if needed
    // staleTime: 10 * 60 * 1000, // 10 minutes (optional override)
  });
};

// Example of a query with parameters
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      // Mock API call with user ID
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: userId,
        account: `ACC${userId.padStart(3, '0')}`,
        bank: 'Vietcombank',
        amount: Math.floor(Math.random() * 20000000),
        createdAt: new Date().toISOString().split('T')[0],
      };
    },
    enabled: !!userId, // Only run query if userId is provided
  });
}; 