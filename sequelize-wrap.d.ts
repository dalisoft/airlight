import { Model, BuildOptions, WhereOptions, FindOptions } from 'sequelize';

type ModelFieldValue = string | number | null;
interface ModelResponse {
  [key: string]: ModelFieldValue | ModelFieldValue[];
}

type ModelModified = typeof Model & {
  new (values?: object, options?: BuildOptions): Model;
};

declare class sequelizeWrap {
  fields: string[];
  model: Model | ModelModified;
  constructor(model: Model | ModelModified);
  private __$$parseWhere(where: WhereOptions, stack: number): WhereOptions;
  get(id: string | number): ModelResponse;
  findOne(config: FindOptions, where: WhereOptions): ModelResponse;
  getOne(where: WhereOptions, config: FindOptions): ModelResponse;
  findByKey(key: string, value: ModelFieldValue): ModelResponse;
  findAll(config: FindOptions): ModelResponse[];
  findAllWhere(where: WhereOptions): ModelResponse[];
  findAndCountAll(config: FindOptions): ModelResponse[];
  count(config: FindOptions): ModelResponse;
  countWhere(where: WhereOptions): ModelResponse;
  create(content: ModelResponse): ModelResponse;
  updateOrCreate(content: ModelResponse): ModelResponse;
  bulkCreate(contents: ModelResponse[], config: FindOptions): ModelResponse[];
  update(ModelResponse, config: FindOptions): ModelResponse;
  updateWhere(ModelResponse, where: WhereOptions): ModelResponse;
  updateByID(ModelResponse, id: string | number): ModelResponse;
  delete(config: FindOptions): ModelResponse;
  deleteWhere(where: WhereOptions): ModelResponse;
  deleteAll(): ModelResponse[];
  arrayAppend(
    column: string,
    item: ModelResponse,
    config: FindOptions
  ): ModelResponse;
  arrayRemove(
    column: string,
    item: ModelResponse,
    where: WhereOptions,
    config: FindOptions
  ): ModelResponse;
  arrayAppendByID(
    column: string,
    item: ModelResponse,
    id: string | number
  ): ModelResponse;
  arrayRemoveByID(
    column: string,
    item: ModelResponse,
    id: string | number
  ): ModelResponse;
  arrayAppendWhere(
    column: string,
    item: ModelResponse,
    where: WhereOptions
  ): ModelResponse;
  arrayRemoveWhere(
    column: string,
    item: ModelResponse,
    where: WhereOptions
  ): ModelResponse;
  getColumn(where: WhereOptions, column: string): ModelFieldValue;
  getLastItem(): ModelResponse;
}

export = sequelizeWrap;
