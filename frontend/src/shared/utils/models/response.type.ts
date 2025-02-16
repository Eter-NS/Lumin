export type ApiResponse<T> =
  | {
      state: 'pending'
    }
  | {
      state: 'resolved'
      data: T
    }
  | {
      state: 'rejected'
      error?: string
    }
