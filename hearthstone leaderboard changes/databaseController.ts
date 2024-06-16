import { Db, MongoClient } from 'mongodb';


interface DatabaseController {
    client: MongoClient
    database: Db
}

const errorMsg = "Error occurred while attempting to";

class DatabaseController {
    constructor(url: string, database: string) {
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
    async getDocument(collection: string, documentID: string) {
        const myCollection = this.database.collection(collection);
        
        return myCollection.findOne({_id: documentID} as object);
    }

    async pushToDocument(value: object, documentID: string, arrayName: string, collection: string) {
        await this.database.collection(collection).updateOne(
            { "_id": documentID } as object,
            { "$push":
                {
                    [`players.${arrayName}`]: value
                }
            }
        );
    }

    async deleteFromDocument(value: string, documentID: string, arrayName: string, collection: string) {
        await this.database.collection(collection).updateOne(
            { "_id": documentID } as object,
            { "$pull":
                {
                    [`players.${arrayName}`]: value
                }
            }
        )
    }
}

export { DatabaseController };