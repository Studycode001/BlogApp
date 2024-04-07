import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    database;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredimg, status, userId}){
        try {
            return await this.database.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredimg,
                status,
                userId
            })
        } catch (error) {
            console.log("Appwrite :: createPost :: error",error)
        }
        return null
    }

    async updatePost(slug,{featuredimg,title,content,status}){
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredimg,
                status,
            })
        } catch (error) {
            console.log("Appwrite :: updatePost :: error",error)
        }
        return null
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
            return true
        } catch (error) {
            console.log("Appwrite :: deletePost :: error",error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("Appwrite :: getPost :: error",error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status",["active"])]){
        try {
            return await this.database.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId)
        } catch (error) {
            console.log("Appwrite :: getPosts :: error",error)
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.storage.createFile(conf.appwriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error",error)
            return false
        }
    }
    async updateFile(file){
        try {
            return await this.storage.updateFile(conf.appwriteBucketId,file)
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error",error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(conf.appwriteBucketId,fileId)
            return true
        } catch (error) {
            console.log("Appwrite :: deleteFile :: error",error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(conf.appwriteBucketId,fileId)
    }

}

const appwriteService = new Service()

export default appwriteService;