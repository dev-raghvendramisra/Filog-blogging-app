import { Query } from "appwrite";
import { dbServices } from "../backend-services";


export default async function getBlogPosts({userId="#",query=[],offset=0,limit=10,dispatch,clearBlogs,setBlogs}){
     
    const queries=[
        Query.equal("status",[true]),
        Query.orderAsc("randomIndex"), //temporary query just to scramble the data
        Query.notEqual("userId",[userId]),
        Query.limit(limit),
        ...query
    ]


    const res =  await dbServices.getBlogs(queries,Query.offset(offset))
    if(offset==0){
            if(res.documents && res.documents.length>0){
               dispatch(clearBlogs());
              dispatch(setBlogs(res.documents))
              return {ok:true,res:res}
            }
            else{
                return {ok:false,res:res,message:"Nothing to show here !"}
            }    
        } 
    if(offset>0){
         if(res.documents.length>0){
            dispatch(setBlogs(res.documents))
         }
         else{
            return {ok:false,res:res,message:"Nothing to show here !"}
         }
    }
}

