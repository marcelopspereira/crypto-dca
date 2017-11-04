const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} = require('graphql');

// const { Op: {like} } = require('sequelize');
const { resolver } = require('graphql-sequelize');
const { Transaction } = require('../');
const transactionType = require('./type');
// const sort = require('../../helpers/sort');

module.exports = {
  transaction: {
    type: transactionType,
    args: {
      id: {
        description: 'ID of transactions',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: resolver(Transaction)
  },
  transactions: {
    type: new GraphQLList(transactionType),
    resolve: resolver(Transaction)
  },
  //TODO: this
  // transactionSearch: {
  //   type: new GraphQLList(Transaction),
  //   args: {
  //     query: {
  //       description: 'Fuzzy search on startCoin, endCoin, startWallet, endWallet',
  //       type: new GraphQLNonNull(GraphQLString)
  //     }
  //   },
  //   resolve: resolver(Transaction, {
  //     before: (findOptions, args) => {
  //       findOptions.where = {

  //         name: { [like]: `%${args.query}%` },
  //       };
  //       findOptions.order = [['name', 'ASC']];
  //       return findOptions;
  //     },
  //     after: sort
  //   })
  // }
}
