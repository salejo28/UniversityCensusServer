export interface AuthRoutesUI {
  register: () => void;
  login: () => void;
  refrestToken: () => void;
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
