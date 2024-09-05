const conf = {
   appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
   projectId: String(import.meta.env.VITE_PROJECT_ID),
   dbId: String(import.meta.env.VITE_DATABASE_ID),
   blogCollectionID: String(import.meta.env.VITE_BLOG_COLLECTION_ID),
   userProfilesCollectionID: String(import.meta.env.VITE_USERPROFILE_COLLECTION_ID),
   blogLikesCollectionID: String(import.meta.env.VITE_BLOGLIKES_COLLECTION_ID),
   blogCommentsCollectionID: String(import.meta.env.VITE_BLOGCOMMENTS_COLLECTION_ID),
   bucketId: String(import.meta.env.VITE_BUCKET_ID),
   authObjKey: String(import.meta.env.VITE_AUTH_OBJ_KEY),
   signatureKey: String(import.meta.env.VITE_SIGNATURE_KEY),
   emailVerificationEndpoint: String(import.meta.env.VITE_EMAIL_VERIFICATION_ENDPOINT), 
   adminId:String(import.meta.env.VITE_ADMIN_ID)//temp
}

export default conf;