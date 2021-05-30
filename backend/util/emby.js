const fetch = require("node-fetch");

class Emby {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }

  async createUser(username, password) {
    //
    //
    // this will create user to the emby server.
    //
    const createdUser = await fetch(
      `${this.url}/emby/Users/New?api_key=${this.apiKey}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
        }),
      }
    );

    if (!createdUser.ok) {
      throw createdUser;
    }

    const responseData = await createdUser.json();
    const userId = responseData.Id;

    //
    //
    //setting password for the user
    //
    const setPassword = await fetch(
      `${this.url}/emby/Users/${userId}/Password?api_key=${this.apiKey}`,
      {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          currentPw: "",
          NewPw: password,
        }),
      }
    );
    if (!setPassword.ok) {
      throw "can't added user password.";
    }
    this.hideUser(userId);

    return { username, password, userId };
  }
  async hideUser(userId) {
    const hideUser = await fetch(
      `${this.url}/emby/Users/${userId}/Policy?api_key=${this.apiKey}`,
      {
        body: JSON.stringify({
          IsHidden: true,
          IsHiddenRemotely: true,
        }),
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    if (!hideUser.ok) {
      throw hideUser;
    }
  }
}

module.exports = Emby;
