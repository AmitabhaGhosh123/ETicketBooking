const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/user');
const Event = require('./models/events');
const Ticket = require('./models/orders');
const db = "mongodb+srv://user:user123@cluster0.wwa4xsf.mongodb.net/usersDB?retryWrites=true&w=majority";
const jwt = require('jsonwebtoken');
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "3780fc12",
    apiSecret: "7FFKgPdUMOz9XBZv"
})
  
mongoose.connect(db, err => {
    if(err) {
        console.error("Error" + err);
    }
    else {
        console.log("connected to mongodb");
    }
})

router.post('/register',(req,res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error,registeredUser) => {
        if(error) {
            res.status(500).send("There was a problem registering the user.");
        }
        else {
            let payload = {subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token:token, message: "You have registered successfully", userRole: registeredUser.role});
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({userName: userData.userName}, (err, user) => {
        if(err) {
            res.status(500).send("There was a problem in logging in");
        }
        else {
            if(!user) {
                res.status(400).send("Invalid username");
            }
            else {
                if(user.password !== userData.password) {
                    res.status(400).send("Invalid password");
                }
                else {
                    let payload = {subject: user._id};
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token:token, message: "You have logged in successfully" , userRole: user.role});
                }
            }
        }
    })
})

router.post('/createevent', (req,res) => {
    let eventData = req.body;
    let event = new Event(eventData);
    event.save((error,event) => {
        if(error) {
            res.status(500).send("There was a problem in creating the event");
        }
        else {
            res.status(200).send({message: "Event successfully created"});
        }
    })
})

router.get('/events', (req,res) => {
    Event.find((err,events) => {
      if(err) {
        res.status(500).send("There was a problem in fetching all events");
      }
      else {
        res.status(200).send({allEvents: events});
      }
    })
})

router.put('/events/:id', (req,res) => {
   Event.findByIdAndUpdate(req.params.id,req.body).exec(function(err,result) {
     Event.findById(req.params.id).exec(function(err,result) {
        if(err) {
            res.status(500).send("Update failed !!!");
        }
        else {
            res.status(200).send({updatedEvent:result,message:"Event updated successfully"});
        }
     })
   })
})

router.post('/bookticket', (req,res) => {
    let ticketData = req.body;
    let ticket = new Ticket(ticketData);
    const from = "Vonage APIs";
    const to = req.body.mobileNumber;
    const text = `You have successfully booked ${req.body.noOfTickets} for event ${req.body.bookedEventName}`;
    ticket.save((error,ticket) => {
        if(error) {
            console.log(error);
            res.status(500).send("There was a problem in booking the ticket");
        }
        else {
            res.status(200).send({message: "Ticket booked successfully"});
            sendSMS(to,from,text);
        }
    })
})

async function sendSMS(to,from,text) {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

module.exports = router;
