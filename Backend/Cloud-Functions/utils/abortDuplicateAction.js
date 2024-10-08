import dbServices from "../Services/dbService.js";

export default async function abortDuplicateAction(initiatingUserProfile, log) {
    const res = await dbServices.updateProfileDocument({
        profileId: initiatingUserProfile.$id,
        stagedAction: null,
        version: initiatingUserProfile.version + 1,
        log
    });

    if (res.$id) {
        log("Aborted duplicate stagedAction request successfully:", res);
        return { ok: false, res };
    } else {
        log("Failed to abort duplicate request");
        return { ok: false, res };
    }
}