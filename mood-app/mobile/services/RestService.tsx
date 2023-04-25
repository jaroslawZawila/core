import axios from 'axios';


interface SaveMoodReq {
    mood: string;
    userId: string;
    createdAt: string;
}
const API_URL = 'https://zmtpd1ae42.execute-api.eu-west-2.amazonaws.com/test/save-mood';

export class RestService {
    static saveMood(moodReq: SaveMoodReq) {

        console.log('Mood: ' + JSON.stringify(moodReq));

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        // axios.defaults.headers.post['x-api-key'] = '34fbebf08bf047faa8f44b6ea5e0fe9a';

        // return JSON.stringify(moodReq);
        return axios.post(API_URL, moodReq)
            .then((response) => {
                console.log('Response: ' + JSON.stringify(response.data))
            }).catch((error) => {
                console.error(API_URL)
                console.error(error);
            });

    }

}


