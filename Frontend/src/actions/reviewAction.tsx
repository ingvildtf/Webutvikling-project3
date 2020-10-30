export const addRating = (id: string) => {
  return {
    type: 'ADD_REVIEW',
    payload: id,
  }
}
