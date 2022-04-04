interface TypeIdUI {
  id_tip_doc?: number;
  tipo_documento: string;
  iniciales_tip_doc: string;
}

export interface One {
  [key: string]: string | number;
}

interface UpdateTypeIdUIGlobal<T> {
  [key: string]: T;
}

type UpdateTypeIdType = UpdateTypeIdUIGlobal<number | string> & {
  newData: TypeIdUI;
};

export interface TypeIdModelUI {
  getAll?: () => Promise<TypeIdUI[]>;
  getOne?: (params: One) => Promise<unknown>;
  getById?: (id: number) => Promise<TypeIdUI>;
  create?: (data: TypeIdUI) => Promise<unknown>;
  deleteOne?: (data: UpdateTypeIdType) => Promise<unknown>;
  deleteById?: (id: number) => Promise<unknown>;
  updateOne?: (params: One) => Promise<unknown>;
  updateById?: (id: number) => Promise<unknown>;
}
