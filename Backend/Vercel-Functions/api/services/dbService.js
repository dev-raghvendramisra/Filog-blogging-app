import {Client, Databases, Query} from 'node-appwrite';
import conf from '../conf/conf.js';
class dbService{
     
    client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    .setKey(conf.appwriteApiKey);

    database

    constructor(){
      this.database = new Databases(this.client);
    }

    async getBlog(id){
       try {
        const blog = await this.database.getDocument(conf.appwriteDbId,conf.appwriteBlogCollectionId,id);
        if(blog.$id){
            return blog;
        }
        throw false
       } catch (error) {
          return error;
       }
    }
    async getProfile(id){
      try {
        const profile = await this.database.listDocuments(conf.appwriteDbId,conf.appwriteProfileCollectionId,[Query.equal("userId",id)]);
        if(profile.documents.length>0){
            return profile.documents[0];
        }
        throw false
      } catch (error) {
        return error;
      }
    }
    async getTokenDocument(userId){
      try {
        const res = await this.database.getDocument(conf.appwriteDbId,conf.appwriteBlackListedTokenCollectionId,userId);
        return res
      } catch (error) {
        console.log("Failed to retreive blackListedToken document for requested id",error);
        return error
      }
    }
    async blackListToken(create,userId,token,existingTokens){
      try {
        const res = create 
                    ? await this.database.createDocument(conf.appwriteDbId,conf.appwriteBlackListedTokenCollectionId,userId,{tokens:[token]})
                    : await this.database.updateDocument(conf.appwriteDbId,conf.appwriteBlackListedTokenCollectionId,userId,{tokens:[...existingTokens,token]})
        return res;
      } catch (error) {
        console.log("Failed to blacklist token",error);
        return error
        
      }
    }
}
const dbServices = new dbService();

export default dbServices;