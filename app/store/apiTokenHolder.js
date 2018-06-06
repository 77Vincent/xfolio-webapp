const apiTokenHolder = {
  tokenValue: '',
  get token() {
    return this.tokenValue
  },
  set token(value) {
    this.tokenValue = value
  },
}

export default apiTokenHolder
