import {Component} from "react";
import {MoodButton} from "./MoodButton";

export class MoodPanel extends Component<any, any> {
    render() {
        return (
            <div>
                <MoodButton />
                <MoodButton />
                <MoodButton />
                <MoodButton />
                <MoodButton />
            </div>
        );
    }
}
