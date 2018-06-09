const constDataHolder = {
  apiTokenValue: '',
  get apiToken() {
    return this.apiTokenValue
  },
  set apiToken(value) {
    this.apiTokenValue = value
  },

  majorsValue: [],
  get majors() {
    return this.majorsValue
  },
  set majors(value) {
    this.majorsValue = value
  },
  majorsValueNormalized: [],
  get majorsNormalized() {
    return this.majorsValueNormalized
  },
  set majorsNormalized(value) {
    this.majorsValueNormalized = value
  },

  degreesValue: [],
  get degrees() {
    return this.degreesValue
  },
  set degrees(value) {
    this.degreesValue = value
  },

  countriesValue: [],
  get countries() {
    return this.countriesValue
  },
  set countries(value) {
    this.countriesValue = value
  },
  countriesValueNormalized: [],
  get countriesNormalized() {
    return this.countriesValueNormalized
  },
  set countriesNormalized(value) {
    this.countriesValueNormalized = value
  },

  provincesValue: [],
  get provinces() {
    return this.provincesValue
  },
  set provinces(value) {
    this.provincesValue = value
  },

  citiesValue: [],
  get cities() {
    return this.citiesValue
  },
  set cities(value) {
    this.citiesValue = value
  },
}

window.constDataHolder = constDataHolder
export default constDataHolder
