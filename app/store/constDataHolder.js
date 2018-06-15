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
  majorsNormalizedValue: [],
  get majorsNormalized() {
    return this.majorsNormalizedValue
  },
  set majorsNormalized(value) {
    this.majorsNormalizedValue = value
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
  countriesNormalizedValue: [],
  get countriesNormalized() {
    return this.countriesNormalizedValue
  },
  set countriesNormalized(value) {
    this.countriesNormalizedValue = value
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
  citiesNormalizedValue: [],
  get citiesNormalized() {
    return this.citiesNormalizedValue
  },
  set citiesNormalized(value) {
    this.citiesNormalizedValue = value
  },
}

window.constDataHolder = constDataHolder
export default constDataHolder
