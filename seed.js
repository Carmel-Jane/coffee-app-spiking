const client = require('./demo')

async function seedDB() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("coffee_app_test").collection("coffee_shops");

        const dropCollection = await collection.drop();

        const db = await client.db("coffee_app_test").collection("coffee_shops").insertMany([{coffee_shop: "seed1", location: "seed2"}, {coffee_shop: "seed2", location: "seed2"}]);

        console.log("Database seeded! :)");
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();