import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


interface AppConfig {
    API_BASE: string;
}

export class Config {

    static async getId(): Promise<string> {
        const appId = await SecureStore.getItemAsync('appId')
        if (appId == null) {
            const newAppId: string = uuidv4().toString();
            console.info("Created new appId: " + newAppId)
            await SecureStore.setItemAsync('appId', newAppId);
            return newAppId;
        }
        console.log("App id: " + appId)
        return appId;

    }

    static getConfig() {
        return {
            API_BASE: "https://6mpmnvlse8.execute-api.eu-west-2.amazonaws.com/test"
        } as AppConfig
    }

}
