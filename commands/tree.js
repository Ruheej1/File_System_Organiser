const fs = require('fs')

const path = require('path')

function treeFn(dirpath){

    if (dirpath == undefined){
       console.log('Please Enter a valid directory Path');
       
    }    else {
       let doesExist = fs.existsSync(dirpath);
       
               if(doesExist== true){
                   treeHelper(dirpath ," ")
               }
   
           }
   
   }

function treeHelper(targetPath, indent){
    let isFile =  fs.lstatSync(targetPath).isFile()
    //here we are checking whether the targetPath is a file or folder
 
    if(isFile == true){
      let fileName = path.basename(targetPath)
      console.log(indent + '├──' + fileName);
      // this will display the files 
 
    }else{
     let dirName = path.basename(targetPath);
     console.log(indent + '└──' + dirName);
     //this will display the folders
 
     let children = fs.readdirSync(targetPath);
 
     // console.log(children);
     //here we took out all the children of test folder
 
     for(let i=0; i<children.length; i++){
         let childPath = path.join(targetPath,children[i])
         // console.log(childPath);
         treeHelper(childPath, indent + '\t' )
     }
   }
 }


 module.exports = {
    treekey: treeFn
 }