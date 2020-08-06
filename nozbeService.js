class NozbeService
{
    CLIENT_ID = "5c96d2cd43a90d4f3a702f724e4b7d1380f68dbe";
    URL = 'https://api.nozbe.com:3000/';

    async getTasks(token){
        const response = await fetch(`${this.URL}list?access_token=${token}&type=task`);
        return response.json();
    }

    async getAllCategories(token){
        const response = await fetch(`${this.URL}list?access_token=${token}&type=context`);
        return response.json();
    }

    async getTasksByCategoryId(token, category_id){
        const response = await fetch(`${this.URL}tasks?access_token=${token}&type=context&id=${category_id}`);
        return response.json();
    }

    login(){
        window.open(`${this.URL}login?client_id=${this.getClientId()}`);
    }

    getClientId(){
        return this.CLIENT_ID;
    }
}