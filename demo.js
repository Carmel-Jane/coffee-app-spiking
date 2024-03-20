

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://test-user:test-password@cluster0.lgmelut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("coffee_app_test").collection("coffee_shops");

        // Drop the collection if it already exists
        const dropCollection = await collection.drop();

        // Seed the database with coffee shop data
        const coffeeShops = [
            { name: "Coffee Shop 1", longitude: "longitude 1", latitude : "latitude 1" },
            { name: "Coffee Shop 2", longitude: "longitude 2", latitude : "latitude 2"},
            // Add more coffee shops as needed
        ];

        const db = await client.db("coffee_app_test").collection("coffee_shops").insertMany(coffeeShops);

        console.log("Database seeded! :)");
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

main().catch(console.error);