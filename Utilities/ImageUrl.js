export const ImageUrl = (size, path) => {
  const url = `https://image.tmdb.org/t/p/`
  return url + 'w' + size + '/' + path
}
