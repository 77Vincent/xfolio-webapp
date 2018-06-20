const constDataHolder = {
  apiTokenValue: '',
  get apiToken() { return this.apiTokenValue },
  set apiToken(value) { this.apiTokenValue = value },

  majorsValue: [],
  get majors() { return this.majorsValue },
  set majors(value) { this.majorsValue = value },

  schoolsValue: [],
  get schools() { return this.schoolsValue },
  set schools(value) { this.schoolsValue = value },

  placesValue: [],
  get places() { return this.placesValue },
  set places(value) { this.placesValue = value },

  countriesValue: [],
  get countries() { return this.countriesValue },
  set countries(value) { this.countriesValue = value },

  degreesValue: [],
  get degrees() { return this.degreesValue },
  set degrees(value) { this.degreesValue = value },

  statusValue: [],
  get status() { return this.statusValue },
  set status(value) { this.statusValue = value },

  citiesValue: [],
  get cities() { return this.citiesValue },
  set cities(value) { this.citiesValue = value },
}

window.constDataHolder = constDataHolder
export default constDataHolder
