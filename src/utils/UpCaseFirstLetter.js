export default (word) => {
  if(word.split('_').length > 1) {
    let words = word.split('_')
    return words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words[1].charAt(0).toUpperCase() + words[1].slice(1)
  } else {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
}
