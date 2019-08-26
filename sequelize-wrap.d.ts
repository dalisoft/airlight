import sequelize from 'sequelize';

type ModelFieldValue = string | number | null;
interface ModelResponse {
  [key: string]: ModelFieldValue | ModelFieldValue[];
}

declare class sequelizeWrap {
  fields: string[];
  model: sequelize.Model;
  constructor(model: sequelize.Model);
  private __$$parseWhere(
    where: sequelize.WhereOptions,
    stack: number
  ): sequelize.WhereOptions;
  get(id: string | number): ModelResponse;
  findOne(
    config: sequelize.FindOptions,
    where: sequelize.WhereOptions
  ): ModelResponse;
  getOne(
    where: sequelize.WhereOptions,
    config: sequelize.FindOptions
  ): ModelResponse;
  findByKey(key: string, value: ModelFieldValue): ModelResponse;
  findAll(config: sequelize.FindOptions): ModelResponse[];
  findAllWhere(where: sequelize.WhereOptions): ModelResponse[];
  findAndCountAll(config: sequelize.FindOptions): ModelResponse[];
  count(config: sequelize.FindOptions): ModelResponse;
  countWhere(where: sequelize.WhereOptions): ModelResponse;
  create(content: ModelResponse): ModelResponse;
  updateOrCreate(content: ModelResponse): ModelResponse;
  bulkCreate(
    contents: ModelResponse[],
    config: sequelize.FindOptions
  ): ModelResponse[];
  update(ModelResponse, config: sequelize.FindOptions): ModelResponse;
  updateWhere(ModelResponse, where: sequelize.WhereOptions): ModelResponse;
  updateByID(ModelResponse, id: string | number): ModelResponse;
  delete(config: sequelize.FindOptions): ModelResponse;
  deleteWhere(where: sequelize.WhereOptions): ModelResponse;
  deleteAll(): ModelResponse[];
  arrayAppend(
    column: string,
    item: ModelResponse,
    config: sequelize.FindOptions
  ): ModelResponse;
  arrayRemove(
    column: string,
    item: ModelResponse,
    where: sequelize.WhereOptions,
    config: sequelize.FindOptions
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
    where: sequelize.WhereOptions
  ): ModelResponse;
  arrayRemoveWhere(
    column: string,
    item: ModelResponse,
    where: sequelize.WhereOptions
  ): ModelResponse;
  getColumn(where: sequelize.WhereOptions, column: string): ModelFieldValue;
  getLastItem(): ModelResponse;
}

export = sequelizeWrap;
