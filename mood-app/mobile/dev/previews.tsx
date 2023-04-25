import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import RootLayout from "../app/_layout";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/RootLayout">
                <RootLayout/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
