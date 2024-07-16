import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../../Conf/conf";
import  authServices  from "../Auth/auth";

export class DatabaseService {
    client = new Client()
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.projectId);
    database;

    storageBucket;
    constructor() {
        this.database = new Databases(this.client);
        this.storageBucket = new Storage(this.client);
    }

    async createBlog({
        title,
        content,
        coverImageId,
        subImagesId = [],
        userId,
        status = true,
    }) {
        const blogAttr = {
            title:title,
            content:content,
            coverImageId:coverImageId,
            subImagesId:subImagesId,
            userId:userId,
            createdAt:createdAt(),
            status:status
        }
        try {
            const res = await this.database.createDocument(
                conf.dbId,
                conf.collectionId,
                ID.unique(),
                blogAttr
            );

            if (res.databaseID) {
                return res;
            } else
                throw { err: "dbService error :: failed to create document", res: res };
        } catch (error) {
            console.log("dbService error :: failed to create document", error);
            return error
        }
    }

    async updateBlog(blogId,updatedBlogAttr){
       try {
        const updatedBlog =  await this.database.updateDocument(
             conf.dbId,
             conf.collectionId,
             blogId,
             updatedBlogAttr
 
         )
         if(updatedBlog.title){
            return updatedBlog;
         }
         else{
            throw {err:"dbService error :: failed to update document : " ,updatedBlog:updatedBlog}
         }
       } catch (error) {
           console.log("dbService error :: failed to update document : ",error )
           return error
       }
    }

    async deleteBlog(blogId){
         try {
            const res = await this.database.deleteDocument(
               conf.dbId,
               conf.collectionId,
               blogId
            )
            if(res.documentID){
                return res;
            }
            else{
                throw {err:"dbService error :: failed to delete document : ", res:res}
            }
     
         } catch (error) {
            console.log("dbService error :: failed to delete document : ", error)
            return error
         }
    }

    async getBlogs(query = [Query.equal("status", [true])]){
       try {
        const res = await this.database.listDocuments(
             conf.dbId,
             conf.collectionId,
             query
         );

         if(res.documents){
            return res
         }
         else{
            throw{err:"dbService error :: failed to retreive documents :" ,res:res}
         }
       } catch (error) {
            console.log("dbService error :: failed to retreive documents :", error)
            return error

       }
    }

    async uploadImage(coverImage, subImages = []) {
        const imageIds = {};
        try {
            const { $id } = await this.storageBucket.createFile(
                conf.bucketId,
                ID.unique(),
                coverImage
            );
            imageIds.$id = $id;

            if (subImages.length !== 0) {
                const subImagesId = await Promise.all(
                    subImages.map(async (image) => {
                        return await this.storageBucket.createFile(
                            conf.bucketId,
                            ID.unique(),
                            image
                        );
                    })
                );
                imageIds.subImagesId = subImagesId;
            }
            return imageIds;
        } catch (error) {
            console.log("error in dbService :: imageUpload error: ", error);
            return { err: "error in dbService :: imageUpload error: ", error };
        }
    }


}

function createdAt() {
    const crrDate = new Date();
    let formattedDate = crrDate.toDateString();
    formattedDate = formattedDate.substring(
        formattedDate.indexOf(" ") + 1,
        formattedDate.length
    );
    let time = crrDate.toTimeString();
    time = time.substring(0, time.lastIndexOf(":"));
    if (time.substring(0, 1) <= 11) {
        time += " AM";
    } else {
        time += " PM";
    }

    formattedDate += " " + time;
    return formattedDate;
}

const dbServices = new DatabaseService();
export default dbServices;