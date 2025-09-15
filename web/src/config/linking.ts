const linking = {
  auth: {
    login: '/login',
  },
  grocery: {
    index: '/',
    id: (id: string) => `/${id}` as const,
  },
} as const

export default linking
