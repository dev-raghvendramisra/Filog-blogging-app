 const conf ={
     appwriteUrl: String(process.env.VITE_APPWRITE_URL),
     appwriteProjectId: String(process.env.VITE_PROJECT_ID),
     appwriteDbId:String(process.env.VITE_DATABASE_ID),
     appwriteBlogCollectionId: String(process.env.VITE_BLOG_COLLECTION_ID),
     appwriteProfileCollectionId: String(process.env.VITE_USERPROFILE_COLLECTION_ID),
     appwriteApiKey:String(process.env.APPWRITE_API_KEY),
     appwriteBucketId: String(process.env.VITE_BUCKET_ID),
     defaultBody :`
    <!doctype html>
<html lang="en">
  <head>
<meta charset="UTF-8" />
<meta name="title" content="Filog - Create and Share Your Blog Articles | Crafting Narratives, Lighting the Way Forward">
<meta name="description" content="Filog is a user-friendly blogging platform that allows you to create accounts, write articles, and share your thoughts with the world. Join Filog today and start your blogging journey!">
<meta name="keywords" content="blogging, write blogs, share blogs, create account, Filog, blogging platform, articles">

<!-- Open Graph / Facebook Meta Tags -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://filog.in">
<meta property="og:title" content="Filog - Create and Share Your Blog Articles | Crafting Narratives, Lighting the Way Forward">
<meta property="og:description" content="Filog is a user-friendly blogging platform that allows you to create accounts, write articles, and share your thoughts with the world. Join Filog today and start your blogging journey!">
<meta property="og:image" content="https://filog.in/meta/ogImage.webp">

<!-- Twitter Meta Tags -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://filog.in">
<meta property="twitter:title" content="Filog - Create and Share Your Blog Articles | Crafting Narratives, Lighting the Way Forward">
<meta property="twitter:description" content="Filog is a user-friendly blogging platform that allows you to create accounts, write articles, and share your thoughts with the world. Join Filog today and start your blogging journey!">
<meta property="twitter:image" content="https://filog.in/meta/ogImage.webp">

<!-- Additional Meta Tags -->
<meta name="author" content="Filog">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/png" sizes="192x192" href="/meta/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png">
<link rel="manifest" href="/meta/site.webmanifest">
<link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Filog",
  "url": "https://filog.in",
  "description": "Filog is a user-friendly blogging platform that allows you to create accounts, write articles, and share your thoughts with the world. Join Filog today and start your blogging journey!"
}
</script>

     <script type="module" crossorigin src="/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index.css">
    <title>Filog | Crafting Narratives, Lighting the Way Forward </title>
  </head>
  <body class="dark:bg-darkPrimary min-h-screen">
    <div id="root" ></div>
  </body>
</html>

`
}
export default conf;
