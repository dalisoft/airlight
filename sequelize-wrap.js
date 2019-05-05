(function(factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else if (typeof exports !== "undefined") {
    exports.default = factory();
  }
})(function() {
  return class SequelizeWrapper {
    get fields() {
      return this.__$$fields;
    }
    get model() {
      return this.__$$model;
    }
    constructor(model) {
      // We therse _ and $ to show that these
      // methods are private only usage only
      // and only for private and should not be set again

      this.__$$model = model;
      this.__$$fields = Object.keys(model.rawAttributes);
    }

    __$$parseWhere(where, stack = 5 /* optimal value for SQL helper */) {
      if (!where) {
        return null;
      }
      if (stack <= 0) {
        throw new Error(
          "SQL [Helper]: There are stack issue, " +
            "maybe check your code again for fixing this bug"
        );
      }

      for (let cond in where) {
        if (typeof where[cond] === "object" && !Array.isArray(where[cond])) {
          this.__$$parseWhere(where[cond], stack--);
        } else if (cond.charAt(0) === "$") {
          const condition = where[cond];
          delete where[cond];
          cond = cond.substr(1);
          cond = sequelize.Op[cond];
          where[cond] = condition;
        }
      }
      return where;
    }

    get(id) {
      return this.__$$model.findByPk(id);
    }

    findOne(config = {}, where) {
      config.where = this.__$$parseWhere(where || config.where);
      return this.__$$model.findOne(config);
    }

    getOne(where, config) {
      return where.id && Object.keys(where).length === 1
        ? this.get(where.id)
        : this.findOne(config, where);
    }

    findBySlug(slug) {
      return this.findOne({
        where: {
          slug
        }
      });
    }

    findAll(config = {}) {
      config.where = this.__$$parseWhere(config.where);
      return this.__$$model.findAll(config);
    }

    findAllWhere(where) {
      return this.findAll({ where });
    }

    findAndCountAll(config) {
      config.where = this.__$$parseWhere(config.where);
      return this.__$$model.findAndCountAll(config);
    }

    count(config = {}) {
      return this.__$$model.count(config);
    }

    countWhere(where = {}) {
      return this.__$$model.count({ where });
    }

    create(content) {
      return this.__$$model.create(content);
    }

    updateOrCreate(content) {
      const { id } = content;
      return this.getOne(id ? { id } : content).then(async where => {
        if (where) {
          Object.assign(where, content);
          where.save();
          await this.updateWhere(where.dataValues, { id: where.id });
          return where;
        }
        return this.create(content);
      });
    }

    bulkCreate(values, config = {}) {
      if (config.returning === undefined) {
        config.returning = true;
      }
      if (config.ignoreDuplicates === undefined) {
        config.ignoreDuplicates = true;
      }
      return this.__$$model.bulkCreate(values, config);
    }

    update(update, config) {
      config.where = this.__$$parseWhere(config.where);
      return this.__$$model.update(update, config);
    }

    updateWhere(update, where) {
      return this.update(update, { where });
    }

    updateByID(update, id) {
      return this.updateWhere(update, { id });
    }

    delete(config = {}) {
      if (config.where) {
        config.where = this.__$$parseWhere(config.where);
      }
      return this.__$$model.destroy(config);
    }

    deleteWhere(where) {
      return this.delete({ where });
    }

    deleteAll() {
      return this.delete({
        where: {},
        truncate: true
      });
    }

    arrayAppend(column, item, where) {
      return this.updateWhere(
        {
          [column]: sequelize.fn("array_append", sequelize.col(column), item)
        },
        where
      );
    }

    arrayRemove(column, item, where, config) {
      return this.getOne(where, config).then(async result => {
        if (result[column] !== undefined) {
          let i;
          while ((i = result[column].indexOf(item)) !== -1) {
            result[column].splice(i, 1);
          }
          result.save();
        }
        await this.updateWhere(result.dataValues, { id: result.id });
        return result;
      });
    }

    arrayAppendByID(column, item, id) {
      return this.arrayAppend(column, item, {
        id
      });
    }

    arrayRemoveByID(column, item, id) {
      return this.arrayRemove(column, item, {
        id
      });
    }

    arrayAppendWhere(column, item, where) {
      return this.arrayAppend(column, item, { where });
    }

    arrayRemoveWhere(column, item, where) {
      return this.arrayRemove(column, item, { where });
    }

    getColumn(where, column) {
      return this.getOne(where).then(result => {
        if (result[column] !== undefined) {
          return result[column];
        } else {
          throw new Error("SQL::ColumnNotFound");
        }
      });
    }

    getLastItem() {
      return this.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]]
      })
        .then(results => (results && !results[1] ? results[0] : null))
        .catch(() => null);
    }
  };
});
