const client = require('./demo')

async function seedDB() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("reading_app_test").collection("users");

        const dropCollection = await collection.drop();

        const db = await client.db("reading_app_test").collection("users").insertMany([{username: "seed1", password: "seed2"}, {username: "seed2", password: "seed2"}]);

        console.log("Database seeded! :)");
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();