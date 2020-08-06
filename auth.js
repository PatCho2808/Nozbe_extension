class Auth
{


    isAuth()
    {
        return this.TOKEN !== '';
    }

    getToken()
    {
        return this.TOKEN;
    }

    authorize(nozbe)
    {
        chrome.storage.local.get(['access_token'],
            result => {
                if(result.access_token) {
                    this.TOKEN = result.access_token;
                } else {
                    let token = this.getTokenFromURL();
                    if(token)
                    {
                        this.saveToken(token);
                    } else {
                        nozbe.login();
                    }
                }
            });
    }


    getTokenFromURL()
    {
        let url = new URL(window.location);
        return url.searchParams.get('access_token');
    }

    saveToken(token)
    {
        chrome.storage.local.set({'access_token' : token},
            () => console.log("Saved token to: " + token));
    }
}