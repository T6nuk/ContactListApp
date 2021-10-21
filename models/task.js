const fs = require('fs');
const path = require('path');

//path to the task.json
const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'task.json');

module.exports = class Contact {
    constructor(name, phone){
        this.name = name;
        this.phone = phone;
    }

    saveContact(){
        fs.readFile(pathToFile, (error, fileContent) =>{
            let contacts = [];

            if(!error){
                contacts = JSON.parse(fileContent);
            } else {
                console.log(error);
            }

            contacts.push(this);

            fs.writeFile(pathToFile, JSON.stringify(contacts), (error) => {
                if(error){console.log('Error', error);}
            });

        });
    }
    static fetchTasks(callBack){ //callback, kui midagi kuvada ei ole. salvestab meie fileContent asjad callBacki
        fs.readFile(pathToFile,(error, fileContent) => {
            if (error) {
                callBack([]); //salvestame errori korral tühja massiivi
            }

            callBack(JSON.parse(fileContent));
        });
    }

    //staatiline meetod kustutamiseks 
    static deleteItem(contact){
        fs.readFile(pathToFile, (error, fileContent) =>{ 
            let contacts = []; //massiiv failide salvestamiseks andmetest
            if (!error) {
                contacts = JSON.parse(fileContent);
            }

            //kustutame massiivist tasks ja hiljem 
            for (let i = 0; i < contacts.length; i++){
                if (contacts[i].phone === contact) {
                    //delete
                    contacts.splice(i, 1);
                    break;
                }
            }
            //uuendame massiivi
            fs.writeFile(pathToFile, JSON.stringify(contacts), (error) => {
                if(error){console.log('Error', error);}
            });


        });
    }

}
