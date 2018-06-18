const constDataHolder = {
  apiTokenValue: '',
  get apiToken() {
    return this.apiTokenValue
  },
  set apiToken(value) {
    this.apiTokenValue = value
  },

  // Major
  majorsValue: [],
  get majors() {
    return this.majorsValue
  },
  set majors(value) {
    this.majorsValue = value
  },

  // School
  schoolsValue: [],
  get schools() {
    return this.schoolsValue
  },
  set schools(value) {
    this.schoolsValue = value
  },

  // Country
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

  // Degree
  degreesValue: [],
  get degrees() {
    return this.degreesValue
  },
  set degrees(value) {
    this.degreesValue = value
  },

  // Province
  provincesValue: [],
  get provinces() {
    return this.provincesValue
  },
  set provinces(value) {
    this.provincesValue = value
  },

  // City
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
