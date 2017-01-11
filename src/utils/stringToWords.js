// export default (pathName) => {
//   let UpperCaseHold = ''
//   let nameArrayHold = []
//   let newPathName = null
//   if(pathName.length > 12) {
//     for (let i = 0; i < pathName.length; i++) {
//       if((/^[^a-z]*$/).test(pathName.charAt(i))) {
//         UpperCaseHold = pathName.charAt(i)
//       }
//     }
//     nameArrayHold = pathName.split(UpperCaseHold)
//     nameArrayHold[1] = UpperCaseHold + nameArrayHold[1]
//     nameArrayHold[0] = nameArrayHold[0].charAt(0).toUpperCase() + nameArrayHold[0].slice(1)
//     newPathName = nameArrayHold.join(' ')
//   }
//   return newPathName
// }


function hasNumber(string) {
  return /\d/.test(string);
}

export default (pathName) => {
  let words = null
  if(pathName.length > 20 && hasNumber(pathName)) {
    return null
  } else {
    if(pathName.indexOf('_')) {
      let pathNameArray = pathName.split('_')
      for ( var i = 0; i < pathNameArray.length; i++) {
        pathNameArray[i] = pathNameArray[i].charAt(0).toUpperCase() + pathNameArray[i].slice(1)
      }
      words = pathNameArray.join(' ')

    } else {
      words = pathName.charAt(0).toUpperCase() + pathName.slice(1)
    }
  }
  return words
}
