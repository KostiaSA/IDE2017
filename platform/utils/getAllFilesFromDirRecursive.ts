// по мотивам https://gist.github.com/kethinov/6658166

let fs = require("fs");
let path = require("path");

export function getAllFilesFromDirRecursive(path: string): string[] {
    return walkSync(path);
}


const walkSync = (dir: string, filelist = []) => {
    //console.log(dir);

    fs.readdirSync(dir).forEach((file: string) => {

        let stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            if (
                file.indexOf(".git") === -1 &&
                file.indexOf(".idea") === -1 &&
                file.indexOf(".vs") === -1 &&
                file.indexOf("node_modules") === -1 &&
                file.indexOf("vendor") === -1
            )
                filelist=walkSync(path.join(dir, file), filelist);
        }
        else {
            filelist=filelist.concat(path.join(dir, file))
        }
        // filelist = fs.statSync(path.join(dir, file)).isDirectory()
        //     ? walkSync(path.join(dir, file), filelist)
        //     : filelist.concat(path.join(dir, file));

    });
    return filelist;
}