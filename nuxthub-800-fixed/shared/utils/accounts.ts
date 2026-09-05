export const accountTypes = ['admin', 'user', 'guest'] as const
export type AccountType = typeof accountTypes[number]
