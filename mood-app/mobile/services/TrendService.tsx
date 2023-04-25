import axios from 'axios';

const API_URL = 'https://49trr98gik.execute-api.eu-west-2.amazonaws.com/default/save-to-dynamo';

interface LastWeekTrend {
    id: string,
    dates: [string],
    values: [number]
}

const data = {
    id: "future-id",
    dates: ["16/04", "17/04", "18/04", "19/04", "20/04", "21/04", "22/04"],
    values: [1, 3, 2, 4, 5, 5, 3]
}

export class TrendService {

    static getLastWeekTrend(id: string) {
        console.log('Mood: ' + JSON.stringify(data));
        return data as LastWeekTrend;
        // return axios.post(API_URL, moodReq)
        //     .then((response) => {
        //         console.log('Response: ' + JSON.stringify(response.data))
        //     }).catch((error) => {
        //         console.error(error);
        //     });

    }
}
