interface TypeIdUI {
  id?: number;
  abbreviation: string;
  value: string;
}

interface Update {
  [key: string]: string;
}

export interface GetOneOrDeleteOne {
  [key: string]: string | number;
}
// Gloabls Interfaces
export interface TypeIdModelUI extends ModelUI<TypeIdUI> {}

export interface ModelUI<T> {
  getAll?: () => Promise<T[]>;
  getOne?: (params: GetOneOrDeleteOne) => Promise<T>;
  getById?: (id: number | string) => Promise<T>;
  create?: (data: T) => Promise<T>;
  deleteOne?: (data: GetOneOrDeleteOne) => Promise<T>;
  deleteById?: (id: number | string) => Promise<T>;
  updateOne?: (params: Update, newData: T) => Promise<T>;
  updateById?: (id: number | string, newData: T) => Promise<T>;
}
