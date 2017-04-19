import {replaceAll} from "./replaceAll";

export function getAppHomePath() {
    let appDir = process.mainModule!.filename.replace("index.html", "");
    appDir = replaceAll(appDir, "\\", "/");
    return appDir;
}