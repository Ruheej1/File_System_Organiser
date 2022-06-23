//Creating a file system organiser
//features of the project
//if there are numerous files in a folder and they are not arranged properly
//so, by using this project as a tool, one can arrange those files in specific directories according to their extension
//like text files(.txt) will go into text file folder, .exe files will go into application folder and mp3 files will go into music folder
//so at the end one will have a arranged set of files in specific folder
//js mei input Array ke form mei jaata hai and that array is process.argv Array
//process.argv ek array jisme agr aap cmd pr koi command likhte hain toh woh array ke form mei aajata hai
//argv stands for argument vector

const fs = require('fs');

const helpModule = require('./commands/help')
const organiseModule = require('./commands/organise')
const treeModule = require('./commands/tree')

const path = require('path');
const { treekey } = require('./commands/tree');

let inputArr = process.argv.slice(2);



// console.log(inputArr);
let command = inputArr[0];

switch (command) {
    
    case 'tree': 
       treeModule.treekey(inputArr[1]);
        break;

    case 'organise':
        organiseModule.organisekey(inputArr[1]);
        break;
    
    case 'help':
        helpModule.helpkey();
        break;

    default: 
        console.log('Please enter a valid command');
        break;
}













