const date = require('../getDate.js');
const Contact = require('../models/task');
const Task = require('../models/task');



exports.getMainPage = (req, res) => {
    Contact.fetchTasks(contacts =>{
        let today = date.getTodayDateLong();
        res.render('index.ejs', {date: today, myContacts: contacts});
    })
};

exports.postNewContact = (req, res) => {
    const newContact = new Contact(req.body.newName, req.body.newPhoneNumber)
    newContact.saveContact();

    /*let userTask = req.body.newTask;
    toDoList.push(userTask);
    console.log(toDoList);*/
    res.redirect('/');
};


exports.deleteContact =  (req, res) => {
    let itemToDelete = req.body.checkbox;
    Contact.deleteItem(itemToDelete);
    res.redirect('/');

};