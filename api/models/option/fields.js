const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { Op: {or, iLike} } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const { Option } = require('../');
const optionType = require('./type');
const sort = require('../../helpers/sort');

module.exports = {
  option: {
    type: optionType,
    args: {
      id: {
        description: 'ID of option',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolver(Option)
  },
  options: {
    type: new GraphQLList(optionType),
    resolve: resolver(Option)
  },
  optionSearch: {
    type: new GraphQLList(optionType),
    args: {
      query: {
        description: 'Fuzzy-matched name of option key or value',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: resolver(Option, {
      before: (findOptions, { query }) => {
        findOptions.where = {
          [or]: [{
            name: { [iLike]: `%${query}%` }
          },
          {
            value: { [iLike]: `%${query}%` }
          }
          ]
        };
        findOptions.order = [['name', 'ASC']];
        return findOptions;
      },
      after: sort
    })
  }
}
