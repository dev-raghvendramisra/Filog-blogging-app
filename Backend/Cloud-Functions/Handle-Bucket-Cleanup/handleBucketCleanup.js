import dbServices from "../Services/dbService.js";
import {abortDuplicateAction , handleAssetNotFound} from "../utils/index.js";   

export default async function handleBucketCleanup({ log, userId, assetId, currentUserProfile }) {
    log("Fetching target asset...");
    let targetAsset = await dbServices.getAsset(assetId, log);
    if (!targetAsset.$id) {
        log("Failed to fetch asset");
        const assetNotFoundRes = await handleAssetNotFound(userId, log);
        return assetNotFoundRes;
    }
    log("Target Asset Found",targetAsset)
    log("Deleting Target Asset...")
    const assetDeletion = await dbServices.deleteAsset(assetId,log)
    if(!assetDeletion.ok){
        log("Failed to delete asset");
    }else log("Deleted asset successfully")

    log("Fetching userProfile again to check version...")
    const userProfile = await dbServices.getUserProfile(userId,log)
    if(!userProfile.$id){
        log("Initiating userProfile not found")
        return {ok:false, res:userProfile}
    }
    log("Initiating userProfie found")
    if(userProfile.version!==currentUserProfile.version){
        if(JSON.stringify(userProfile.stagedAction)==JSON.stringify(currentUserProfile.stagedAction)){
            const duplicateReqRes = await abortDuplicateAction(userProfile,log)
            return duplicateReqRes
        }
        log("Profile version mismatch")
        log("Prev version: ",currentUserProfile.version)
        log("Current version: ",userProfile.version)
        return {ok:false, res:userProfile}
    }
    log("Marking stagedAction null...") 
    const stagedActionResetRes = await dbServices.updateProfileDocument({profileId:userProfile.$id,stagedAction:null,version:currentUserProfile.version+1,log})
    if(stagedActionResetRes){
        log("Marked stagedAction null successfully")
        return {ok:true, res:stagedActionResetRes}
    }
    return {ok:false, res:stagedActionResetRes}
}