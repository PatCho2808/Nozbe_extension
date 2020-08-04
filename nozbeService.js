class NozbeService
{
    const CLIENT_ID = "5c96d2cd43a90d4f3a702f724e4b7d1380f68dbe";
    const CLIENT_SECRET = "";
    const ACCESS_TOKEN = ""

    async login()
    {
        const response = await fetch(
            'https://api.nozbe.com:3000/oauth/secret/create',
            { method: 'POST',
                mode: 'no-cors',
            headers: {
                'Content-Type' : 'text/plain'},
            body: "email=anastasia.pawlowicz@protonmail.com&password=s05kGgLJZk9L&redirect_uri=https://laaekoidklbijngehcedfcgbbhoiakgm.chromiumapp.org/newTab.html"
            });
        return response.text();
    }
}