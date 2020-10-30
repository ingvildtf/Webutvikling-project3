export const addRating = (id: string) => {
  return {
    type: 'GET_REVIEWS',
    payload: id,
  }
}
