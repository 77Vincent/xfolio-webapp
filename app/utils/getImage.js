export default function getImage(imgName) {
  /* eslint-disable global-require,import/no-dynamic-require */
  return require(`../assets/images/${imgName}`)
  /* eslint-enable global-require,import/no-dynamic-require */
}
