class Auth {
  constructor() {
    this.TOKEN = "";
  }

  isAuth() {
    return this.TOKEN !== "";
  }

  getToken() {
    return this.TOKEN;
  }

  authorize(nozbe, callback) {
    chrome.storage.local.get(["access_token"], (result) => {
      if (result.access_token) {
        this.TOKEN = result.access_token;
        callback();
      } else {
        chrome.identity.launchWebAuthFlow(
          {
            url: nozbe.getAuthURL(),
            interactive: true,
          },
          function (url) {
            let token = new URL(url).searchParams.get("access_token");
            chrome.storage.local.set({ access_token: token });
            callback();
          }
        );
      }
    });
  }
}

export default Auth;
