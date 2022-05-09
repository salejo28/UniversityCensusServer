export interface AuthRoutesUI {
  register: () => void;
  login: () => void;
  refrestToken: () => void;
  logout: () => void;
}

export interface TypeIdRoutesUI {
  getTypesId: () => void;
  getTypeId: () => void;
  createTypeId: () => void;
  updateTypeId: () => void;
  deleteTypeId: () => void;
}

export interface UserRoutesUI {
  getUser: () => void;
  createUser: () => void;
  updateBornDate: () => void;
  listOfficials: () => void;
  updateInfoUser: () => void;
  addAdditionalInfoOfficial: () => void;
  updateAdditionalInfoOfficial: () => void;
  uploadImageProfile: () => void;
  profile: () => void;
}

export interface SpecieRoutesUI {
  getSpecie: () => void;
  getSpecies: () => void;
  searchSpecie: () => void;
  createSpecie: () => void;
  updateSpecie: () => void;
  deleteSpecie: () => void;
}

export interface RaceRoutesUI {
  getRace: () => void;
  getRaces: () => void;
  searchRace: () => void;
  createRace: () => void;
  updateRace: () => void;
  deleteRace: () => void;
}

export interface AnimalRoutesUI {
  getAnimal: () => void;
  getAnimals: () => void;
  getAnimalByOwner: () => void;
  createAnimal: () => void;
  updateAnimal: () => void;
}

export interface SectorRoutesUI {
  getSectors: () => void;
  getSector: () => void;
  createSector: () => void;
  updateSector: () => void;
  assignSector: () => void;
  unassignSector: () => void;
}

export interface LocationRoutesUI {
  getLocation: () => void;
  createLocation: () => void;
  updateLocation: () => void;
}

export interface CensusRoutesUI {
  getCensus: () => void;
  myReport: () => void;
  getOneCensus: () => void;
  makeCensus: () => void;
  updateCensus: () => void;
  report: () => void;
}
