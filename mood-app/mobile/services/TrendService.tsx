import axios from 'axios';
import { TrendResponse } from 'mood-shared';
import {Config} from "./Config";

export class TrendService {

    static getLastWeekTrend(id: string) {
        return axios.get(Config.getConfig().API_BASE + '/trends/' + id)
            .then((response) => {
                console.log('Response: ' + JSON.stringify(response.data))
                return response.data as TrendResponse
            }).catch((error) => {
                console.error(error);
            })

    }
}
