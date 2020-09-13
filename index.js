const axios = require('axios');
const request = require('request');
const { promisify } = require('util');

const post = promisify(request.post);

const consumer_key = process.env.TWITTER_CONSUMER_KEY; 
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET; 

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');

const login = async () => {
    const requestConfig = {
        url: bearerTokenURL,
        auth: {
            user: consumer_key,
            pass: consumer_secret
        },
        form: {
            grant_type: 'client_credentials'
        }
    };

    const response = await post(requestConfig);
    if (response.statusCode !== 200) {
        throw new Error(JSON.stringify(response.body));
    }
    
    return JSON.parse(response.body)['access_token'];
}

const getTarugoffTweets = async (token) => {
    const response = await axios.get('https://api.twitter.com/1.1/search/tweets.json?q=%23tarugoff', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status !== 200) {
        throw new Error(JSON.stringify(response.data));
    }

    console.log(response.data);

    return response.data.statuses;
}

(async () => {
    const bearerToken = await login();
    const tarugoffTweets = await getTarugoffTweets(bearerToken);

    tarugoffTweets.forEach(tweet => console.log(`@${tweet.user.screen_name} > ${tweet.text}`));
})();
