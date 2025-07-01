// Global API Configuration
export const API_CONFIG = {
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
  },
  sorting: {
    defaultAmountSort: -1,
    defaultCreatedAtSort: -1,
  },
} as const;

// Global default pagination options
export const createDefaultPaginationOption = (sortBy: Record<string, number> = { amount: -1 }) => ({
  page: API_CONFIG.pagination.defaultPage,
  limit: API_CONFIG.pagination.defaultLimit,
  filterBy: "",
  sortBy,
}); 