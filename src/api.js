const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/Tweets`;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export function fetchTweets() {
  return fetch(`${API_URL}?select=*`, { headers })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load tweets from server");
      }
      return res.json();
    });
}

export function postTweet(newTweet) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: newTweet.content,
      userName: newTweet.userName,
      date: newTweet.date,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to add tweet to server");
    }
    return null;
  });
}
