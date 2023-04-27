import axios from 'axios';
import {Config} from "./Config";


interface SaveMoodReq {
    mood: string;
    userId: string;
    createdAt: string;
}

export class RestService {
    static saveMood(moodReq: SaveMoodReq) {
        console.log('URL: ' + Config.getConfig().API_BASE);
        console.log('Mood: ' + JSON.stringify(moodReq));

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        // axios.defaults.headers.post['x-api-key'] = '34fbebf08bf047faa8f44b6ea5e0fe9a';
        return axios.post(Config.getConfig().API_BASE + '/mood', moodReq)
            .then((response) => {
                console.log('Response: ' + JSON.stringify(response.data))
            }).catch((error) => {
                console.error(Config.getConfig().API_BASE)
                console.error(error);
            });

    }

}


