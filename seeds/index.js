const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/Campers-Paradise');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61f76b6d05623d7964d09f03',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfktmlkx1/image/upload/v1643695961/CampersParadise/dcnxphrbkbln13xbvqww.jpg',
                    filename: 'CampersParadise/dcnxphrbkbln13xbvqww'
                  },

                  {
                    url: 'https://res.cloudinary.com/dfktmlkx1/image/upload/v1643695962/CampersParadise/v9xof7nr9twtibeutosv.jpg',
                    filename: 'CampersParadise/v9xof7nr9twtibeutosv'
                  },
                  {
                    url: 'https://res.cloudinary.com/dfktmlkx1/image/upload/v1643695963/CampersParadise/iqoceglzlwjycbcoflwb.jpg',
                    filename: 'CampersParadise/iqoceglzlwjycbcoflwb'
                  }
 
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})