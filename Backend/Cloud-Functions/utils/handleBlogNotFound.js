import dbServices from "../Services/dbService.js";

export default async function handleBlogNotFound(blogId, userId, log) {

    log("Target Blog not found:", blogId);
    log("Fetching initiating user profile to reset stagedAction...");
    const res = await dbServices.getUserProfile(userId, log);
    
    if (res.$id) {
        log("Initiating user profile found successfully:", res);
        log("Resetting stagedAction of initiating user profile...");
        const currentUserInitialProfile = await dbServices.updateProfileDocument({
            profileId: res.$id,
            log,
            stagedAction: null
        });

        if (currentUserInitialProfile.$id) {
            log("Initiating user profile staged action marked as null successfully:", currentUserInitialProfile);
        } else {
            log("Failed to reset stagedAction of initiating user profile");
        }
    } else {
        log("Failed to fetch initiating user profile");
    }

    return { ok: false, res: blogId };
}