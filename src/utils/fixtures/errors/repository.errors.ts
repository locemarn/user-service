export function userRepositoryErrorFilter(error: any) {
  let message: string
  switch (error.code) {
    case 'P2000':
      message = 'Invalid input provided.'
      console.error('Invalid input provided.')
      break
    case 'P2002':
      message = 'Unique constraint violation.'
      console.error('Unique constraint violation.')
      break
    // Add more cases as needed
    default:
      message = 'An unexpected error occurred:'
      console.error('An unexpected error occurred:', error)
      return message
  }
}
