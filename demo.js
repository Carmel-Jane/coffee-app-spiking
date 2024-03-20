const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://test-user:test-password@cluster0.lgmelut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        // await createDb(client, {
        //     username: "testUsername",
        //     savedCoffeeShops: []
        // })

        await createUser(client, {username: "secondUser", savedCoffeeShops:[]})

    }
    catch (e) {
        console.error(e)
    } 
    finally {
        await client.close
    }
}

main().catch(console.error)

async function updateMovieByName(client, movieTitle, updatedMovie) {
    const result = await client.db("sample_mflix").collection("movies").updateOne({title: movieTitle}, {$set: updatedMovie})
    console.log(`${result.matchedCount} documents matched`)
    console.log(`${result.modifiedCount} document was updated`)
    console.log(result)
}

async function findMoviesWithMinimumRuntimeandMinimumYear(client, {minimumRuntime, minimumYear, maximumNumberOfResults = Number.MAX_SAFE_INTEGER}) {
    const cursor = client.db("sample_mflix").collection("movies").find({
        runtime: {$gte: minimumRuntime},
        year: {$gte: minimumYear}
    }).sort({lastupdated: 1})
    .limit(maximumNumberOfResults)

    const results = await cursor.toArray()

    console.log(`Found ${results.length} movies!`)
    console.log(results)
}

async function findOneListingByTitle(client, titleOfMovie) {
    const result = await client.db("sample_mflix").collection("movies").findOne({
        title: titleOfMovie
    })

    if (result) {
        console.log(`Found ${titleOfMovie}`)
        console.log(result._id)
    }
    else {
        console.log('nothing found')
    }
}

async function createUser(client, newUser) {
    const result = await client.db("coffee_app_test").collection("users").insertOne(newUser)
    console.log(result)
    console.log(`New listing created with id ${result.insertedId}`)
}

async function listDatabases(client) {
    const dbList = await client.db().admin().listDatabases()
    console.log("Databases")
    console.log(dbList)
}

async function createDb(client, user) {
    const db = await client.db("coffe_app_test").collection("users").insertOne(user)
    console.log("database created!")
    console.log(db)
}

module.exports = client