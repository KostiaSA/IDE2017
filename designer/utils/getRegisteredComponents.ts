import {IComponentRegistration} from "../../platform/components/Component";
import {getAllFilesFromDirRecursive} from "../../platform/utils/getAllFilesFromDirRecursive";
import {readFileSync} from "fs";
import {replaceAll} from "../../platform/utils/replaceAll";
import {getAppHomePath} from "../../platform/utils/getAppHomePath";


export function getRegisteredComponents(): IComponentRegistration[] {

    let appDir=getAppHomePath();
    let fileList = getAllFilesFromDirRecursive(appDir); // "C:/--IDE2017--/"

    let ret:IComponentRegistration[]=[];

    for (let fileName of fileList) {
        if (fileName.endsWith(".js")) {
            let code = readFileSync(fileName, "utf8");
            if (code.indexOf("__registerBuhtaComponent__") > -1) {
                fileName = replaceAll(fileName, "\\", "/");
                let modulePath = fileName.replace(appDir, "../../");
                let module=require(modulePath);
                if (module.__registerBuhtaComponent__) {
                    ret.push(module.__registerBuhtaComponent__());
                }
            }
        }
    }

    return ret;
}
