import axios from "axios/index";

interface AppConfig {
    API_BASE: string;
}

export class Config {
    static getConfig() {
        return {
            API_BASE: "https://6mpmnvlse8.execute-api.eu-west-2.amazonaws.com/test"
        } as AppConfig
    }

}
