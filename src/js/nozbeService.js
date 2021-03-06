class NozbeService {
  constructor() {
    this.CLIENT_ID = "5c96d2cd43a90d4f3a702f724e4b7d1380f68dbe";
    this.URL = "https://api.nozbe.com:3000/";
  }

  async getTasks(token) {
    const response = await fetch(
      `${this.URL}list?access_token=${token}&type=task`
    );
    return response.json();
  }

  async getAllCategories(token) {
    const response = await fetch(
      `${this.URL}list?access_token=${token}&type=context`
    );
    return response.json();
  }

  async getTasksByCategoryId(token, category_id) {
    const response = await fetch(
      `${this.URL}tasks?access_token=${token}&type=context&id=${category_id}`
    );
    return response.json();
  }

  getClientId() {
    return this.CLIENT_ID;
  }

  getAuthURL() {
    return `${this.URL}login?client_id=${this.getClientId()}`;
  }
}

export default NozbeService;
