import conf from '../conf/conf'
export default function getImgUrl(fileId) {
    let url = `${conf.cdnEndpoint}${fileId}`
    return {url , fileId}
}