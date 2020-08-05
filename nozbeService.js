class NozbeService
{
    CLIENT_ID = "5c96d2cd43a90d4f3a702f724e4b7d1380f68dbe";
    URL = 'https://api.nozbe.com:3000/';

    getClientId(){
        return this.CLIENT_ID;
    }

    async getTasks(token){
        const response = await fetch(`${this.URL}list?access_token=${token}&type=task`);
        return response.json();
    }

    login(){
        window.open(`${this.URL}login?client_id=${this.getClientId()}`);
    }
}