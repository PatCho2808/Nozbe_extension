class NozbeService
{
    URL = 'https://api.nozbe.com:3000/';

    getToken(){
        let json = JSON.parse(secrets);
        return json[0]['access_token'];
    }

    async getTasks(){
        const response = await fetch(`${this.URL}list?access_token=${this.getToken()}&type=task`);
        return response.json();
    }
}