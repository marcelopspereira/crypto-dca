const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => {
    const { User } = require('../');
    return {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the user',
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The name of the user',
      },
      avatar: {
        type: GraphQLString,
        description: 'Avatar image URL'
      },
      ...require('../Wallet/queries')(User.Wallets),
      ...require('../Transaction/queries')(User.Transactions),
      ...require('../Coin/queries')(User.Coins),
      ...require('../Option/queries')(User.Options)
    }
  }
})