const mongoose = require('mongoose');

const { ApolloServer, gql } = require('apollo-server-express');

//resolvers
const {
  portfolioMutations,
  portfolioQueries,
  userMutations,
  userQueries,
  categoryQueries,
  categoryMutations,
  mixedQueries,
} = require('./resolvers');

//types
const { portfolioTypes, userTypes, categoryTypes } = require('./types');

//models
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');
const Category = require('./models/Category');
const Topic = require('./models/Topic');
const Post = require('./models/Post');

//context
const { buildAuthContext } = require('./context');

exports.createApolloServer = server => {
  // Construct a schema, using gql schema language
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}
    ${categoryTypes}

    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      userPortfolios: [Portfolio]

      user: User

      categories: [Category]
      topicsByCategory(category: String): [Topic]
      topic(slug: String): Topic
      postsByTopic(
        topicSlug: String
        pageNum: Int
        postsPerPage: Int
      ): PaginatedPosts

      highlight(limit: Int): HighlightResponse
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): String

      signIn(input: SignInInput): User
      signUp(input: SignUpInput): String
      signOut: Boolean

      createTopic(input: TopicInput): Topic

      createPost(input: PostInput): Post
    }
  `;

  //provides a resolver for each api end point
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
      ...categoryQueries,
      ...mixedQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
      ...categoryMutations,
    },
  };

  //will handle graphql route
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
        User: new User(mongoose.model('User')),
        Category: new Category(mongoose.model('Category')),
        Topic: new Topic(mongoose.model('Topic'), req.user),
        Post: new Post(mongoose.model('Post'), req.user),
      },
    }),
  });
  return apolloServer;
};
