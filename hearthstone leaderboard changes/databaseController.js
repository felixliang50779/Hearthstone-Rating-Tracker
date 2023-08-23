import { MongoClient } from 'mongodb';

const errorMsg = "Error occurred while attempting to";

class DatabaseController {
    constructor(url, database) {
        this.client = new MongoClient(url);
        this.database = this.client.db(database);
    }

    async startClient() {
        try {
            await this.client.connect();
        }
        catch (error) {
            console.log(`${errorMsg} connect: ${error}`);
        }
    }

    async shutdownClient() {
        try {
            await this.client.close();
        }
        catch (error) {
            console.log(`${errorMsg} disconnect: ${error}`);
        }
    }

    // Gets a single document from a specific collection
    async getDocument(collection, documentID) {
        const myCollection = this.database.collection(collection);
        
        return myCollection.findOne({_id: documentID});
    }

    async pushToDocument(value, documentID, arrayName, collection) {
        await this.database.collection(collection).updateOne(
            { "_id": documentID },
            { "$push":
                {
                    [`players.${arrayName}`]: value
                }
            }
        );
    }

    async deleteFromDocument(value, documentID, arrayName, collection) {
        await this.database.collection(collection).updateOne(
            { "_id": documentID },
            { "$pull":
                {
                    [`players.${arrayName}`]: value
                }
            }
        )
    }
}

export { DatabaseController };