import { gql } from 'apollo-boost';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      daysOfExperience @client
      title
      company
      companyWebsite
      location
      jobTitle
      description
      endDate
      startDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      endDate
      startDate
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    createPortfolio(
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      _id
      title
      description
      company
      companyWebsite
      location
      jobTitle
      startDate
      endDate
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio(
    $id: ID
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    updatePortfolio(
      id: $id
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      _id
      title
      description
      company
      companyWebsite
      location
      jobTitle
      startDate
      endDate
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;

export const FETCH_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      _id
      title
      description
      company
      companyWebsite
      location
      jobTitle
      startDate
      endDate
    }
  }
`;

//Auth

export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      username
      role
      avatar
    }
  }
`;

export const CURRENT_USER = gql`
  query User {
    user {
      _id
      username
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

//Auth End

//-----------FORUM

export const CATEGORIES = gql`
  query Categories {
    categories {
      slug
      title
      subTitle
    }
  }
`;

export const TOPICS = gql`
  query TopicsByCategory($category: String) {
    topicsByCategory(category: $category) {
      _id
      slug
      title
      content
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(
      input: { title: $title, content: $content, forumCategory: $forumCategory }
    ) {
      _id
      title
      content
      slug
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;

export const GET_TOPIC = gql`
  query Topic($slug: String) {
    topic(slug: $slug) {
      _id
      title
      content
      slug
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;

const postResponse = `
  _id
  content
  slug
  createdAt
  user {
    username
    avatar
  }
  parent {
    content
    user {
      username
      avatar
    }
  }
`;

export const GET_POSTS_BY_TOPIC = gql`
  query PostsByTopic($topicSlug: String, $pageNum: Int, $postsPerPage: Int) {
    postsByTopic(topicSlug: $topicSlug, pageNum: $pageNum, postsPerPage: $postsPerPage) {
      posts {
        ${postResponse}
      }
      count
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $content: String
    $topic: String
    $parent: String
  ) {
    createPost(input: {
      content: $content
      topic: $topic
      parent: $parent
    }) {
      ${postResponse}
    }
  }
`;

export const GET_HIGHLIGHT = gql`
  query Highlight($limit: Int) {
    highlight(limit: $limit) {
      topics {
        _id
        title
        content
        slug
        user {
          username
          avatar
        }
        createdAt
      }
      portfolios {
        _id
        title
        description
        jobTitle
        startDate
        endDate
      }
    }
  }
`;
//------------------FORUM END
