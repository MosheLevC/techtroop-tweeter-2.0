export const sortTweets = (tweets) => {
  return tweets.sort((a, b) => new Date(b.date) - new Date(a.date));
};
