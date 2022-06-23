//js mei input Array ke form mei jaata hai and that array is process.argv Array
//process.argv ek array jisme agr aap cmd pr koi command likhte hain toh woh array ke form mei aajata hai
//argv stands for argument vector


const fs = require ('fs');
const path = require ('path');

let input = process.argv.slice(2)

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };

let command = input[0];
// console.log(input);

switch(command){
    case "tree":
        console.log('tree');
        break;

    case "help":
        console.log("help");

    case "organise":
        organiseFn(input[1]);
        break;
    
    default: 
      console.log("please enter valid command");
}



function organiseFn(dirpath){
    let destPath;

 if(dirpath==undefined){
    console.log("please enter a valid dirpath");
    return;
 }
 else{
    doesExist = fs.existsSync(dirpath);
    // console.log(doesExist);

    if(doesExist ==true){
        destPath = path.join(dirpath, "organised_files");

        if(fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath);
        }
        else{
            console.log("This folder already exists");
        }
        }
    else{
            console.log("please enter a Valid Path");
        }
 }
organiseHelper(dirpath, destPath);
}



function organiseHelper(src, dest){
    let childNames = fs.readdirSync(src);  

    // console.log(childNames)

    for(let i=0; i<childNames.length; i++){
        
        let childAddress = path.join(src, childNames[i])
        // console.log(childAddress)

        let isFile = fs.lstatSync(childAddress).isFile();
        // console.log( childAddress + " " + isFile);

        if(isFile==true){
                let fileCategory = getCategory(childNames[i]);
                console.log(childNames[i] + " belongs to " + fileCategory);

                sendFiles(childAddress, dest, fileCategory);

        }

    }
}


function getCategory(name){
    let ext = path.extname(name)
    // console.log(ext);
    ext = ext.slice(1)
    // // console.log(ext);



    for(let type in types){
        let cTypeArr = types [type]
        // console.log(cTypeArr);
    

        for(let i=0; i<cTypeArr.length; i++){
            if(ext == cTypeArr[i])
            //we matched the extensions with the values present in cTypeArr
            return type;
        }
    
    }

    return 'others';

}



function sendFiles(srcFilePath, dest, fileCategory){

    let catPath = path.join(dest, fileCategory)

    if(fs.existsSync(catPath)== false){
        fs.mkdirSync(catPath)
    }


    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catPath, fileName)

    fs.copyFileSync(srcFilePath, destFilePath)

    console.log(fileName + "is copied to " + fileCategory);
    fs.unlinkSync(srcFilePath)

}