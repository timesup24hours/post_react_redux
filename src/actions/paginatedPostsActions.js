import {
  GOTO_POSTS_PAGE,
  NEXT_POSTS_PAGE,
  PREV_POSTS_PAGE,
  SORT_POSTS,
  FILTER_POSTS
} from './actionTypes';

export const gotoUserPage = page => ({
  type: GOTO_POSTS_PAGE,
  page
});

export const nextUserPage = () => ({
  type: NEXT_POSTS_PAGE
});

export const prevUserPage = () => ({
  type: PREV_POSTS_PAGE
});

export const sortUsers = by => ({
  type: SORT_POSTS,
  by
});

export const filterUsers = filter => ({
  type: FILTER_POSTS,
  filter
});
