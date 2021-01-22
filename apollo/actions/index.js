import { useQuery, useMutation } from '@apollo/react-hooks';
import { useLazyQuery } from 'react-apollo';

import {
  GET_PORTFOLIOS,
  GET_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  CREATE_PORTFOLIO,
  SIGN_IN,
  CURRENT_USER,
  SIGN_OUT,
  FETCH_USER_PORTFOLIOS,
  CATEGORIES,
  TOPICS,
  CREATE_TOPIC,
  GET_TOPIC,
  GET_POSTS_BY_TOPIC,
  CREATE_POST,
  GET_HIGHLIGHT,
} from '../queries';

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetPortfolio = variables => useQuery(GET_PORTFOLIO, variables);

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] },
      });

      const { userPortfolios } = cache.readQuery({
        query: FETCH_USER_PORTFOLIOS,
      });
      cache.writeQuery({
        query: FETCH_USER_PORTFOLIOS,
        data: { userPortfolios: [createPortfolio, ...userPortfolios] },
      });
    },
  });

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { userPortfolios } = cache.readQuery({
        query: FETCH_USER_PORTFOLIOS,
      });
      let updatedPortfolios = userPortfolios.filter(
        p => p._id !== deletePortfolio
      );
      cache.writeQuery({
        query: FETCH_USER_PORTFOLIOS,
        data: { userPortfolios: updatedPortfolios },
      });

      const { portfolios } = cache.readQuery({
        query: GET_PORTFOLIOS,
      });
      updatedPortfolios = portfolios.filter(p => p._id !== deletePortfolio);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: updatedPortfolios },
      });
    },
  });

export const useGetUserPortfolios = () => useQuery(FETCH_USER_PORTFOLIOS);

//auth

export const useSignInUser = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: signIn }) {
      cache.writeQuery({
        query: CURRENT_USER,
        data: { user: signIn },
      });
    },
  });
export const useLazyCurrentUser = () => useLazyQuery(CURRENT_USER);
export const useCurrentUser = config => useQuery(CURRENT_USER, config);

export const useSignoutUser = () => useMutation(SIGN_OUT);

//auth end

//forum

export const useGetCategories = () => useQuery(CATEGORIES);
export const useGetTopics = variables => useQuery(TOPICS, variables);
export const useCreateTopic = () =>
  useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic } }) {
      try {
        const { topicsByCategory } = cache.readQuery({
          query: TOPICS,
          variables: {
            category: createTopic.forumCategory.slug,
          },
        });
        cache.writeQuery({
          query: TOPICS,
          data: { topicsByCategory: [...topicsByCategory, createTopic] },
          variables: {
            category: createTopic.forumCategory.slug,
          },
        });
      } catch (e) {}
    },
  });

export const useGetTopic = variables => useQuery(GET_TOPIC, variables);

export const useGetPostsByTopic = variables =>
  useQuery(GET_POSTS_BY_TOPIC, variables);

export const useCreatePost = () =>
  useMutation(CREATE_POST, {
    update(cache) {
      try {
        Object.keys(cache.data.data).forEach(key => {
          key.match(/^Post/) && cache.data.delete(key);
        });
      } catch (e) {}
    },
  });

export const useGetHighlight = variables => useQuery(GET_HIGHLIGHT, variables);
//forum end
