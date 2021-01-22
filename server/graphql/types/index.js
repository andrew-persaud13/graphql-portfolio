const portfolioFields = `
title: String
jobTitle: String
company: String
companyWebsite: String
location: String
description: String
startDate: String
endDate: String
`;

exports.portfolioTypes = `
  type Portfolio {
    _id: ID!
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }
`;

exports.userTypes = `
  type User {
    _id: ID,
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    avatar: String
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }


`;

exports.categoryTypes = `
  type Category {
    _id: ID
    title: String
    subTitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    slug: String
    title: String
    content: String
    user: Author
    forumCategory: Category
    createdAt: String
  }

  type Post {
    _id: ID
    slug: String
    content: String
    fullSlug: String
    topic: Topic
    user: Author
    parent: Post
    createdAt: String
  }

  type PaginatedPosts {
    posts: [Post]
    count: Int
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }

  input PostInput {
    content: String
    parent: String
    topic: String
  }

  type HighlightResponse {
    portfolios: [Portfolio]
    topics: [Topic]
  }

`;
