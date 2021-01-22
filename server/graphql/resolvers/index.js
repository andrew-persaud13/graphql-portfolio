exports.mixedQueries = {
  highlight: async (root, { limit = 3 }, ctx) => {
    const portfolios = await ctx.models.Portfolio.getRandoms(limit);
    const topics = await ctx.models.Topic.getRandoms(limit);
    return {
      portfolios,
      topics,
    };
  },
};

exports.portfolioQueries = {
  portfolio: (root, { id }, { models }) => {
    const { Portfolio } = models;
    return Portfolio.getById(id);
  },
  portfolios: (root, args, { models }) => {
    const { Portfolio } = models;
    return Portfolio.getAll();
  },
  userPortfolios: async (root, id, ctx) => {
    return await ctx.models.Portfolio.getPortfoliosByUser();
  },
};

exports.portfolioMutations = {
  createPortfolio: (root, { input: portfolio }, { models }) => {
    const { Portfolio } = models;
    return Portfolio.create(portfolio);
  },
  updatePortfolio: async (root, { id, input }, { models }) => {
    const { Portfolio } = models;
    return Portfolio.findAndUpdate(id, input);
  },
  deletePortfolio: async (root, { id }, { models }) => {
    const { Portfolio } = models;
    return Portfolio.findAndDelete(id);
  },
};

exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
};

exports.userMutations = {
  signIn: async (root, { input }, ctx) => {
    const user = await ctx.models.User.signIn(input, ctx);
    return user;
  },
  signUp: async (root, { input }, ctx) => {
    const user = await ctx.models.User.signUp(input);
    return user._id;
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};

exports.categoryQueries = {
  categories: (root, args, ctx) => {
    return ctx.models.Category.getAll();
  },
  topicsByCategory: async (root, { category }, ctx) => {
    const forumCategory = await ctx.models.Category.getBySlug(category);
    if (!forumCategory) return null;
    return ctx.models.Topic.getTopicsByCategory(forumCategory._id);
  },
  topic: async (root, { slug }, ctx) => {
    return await ctx.models.Topic.findBySlug(slug);
  },
  postsByTopic: async (root, { topicSlug, ...pagination }, ctx) => {
    const topic = await ctx.models.Topic.findBySlug(topicSlug);
    return ctx.models.Post.getAllByTopic({ topicId: topic._id, ...pagination });
  },
};

exports.categoryMutations = {
  createTopic: async (root, { input }, ctx) => {
    const category = await ctx.models.Category.getBySlug(input.forumCategory);
    input.forumCategory = category._id;
    const topic = await ctx.models.Topic.create(input);
    return topic;
  },
  createPost: async (root, { input }, ctx) => {
    const post = await ctx.models.Post.create(input);
  },
};
