// description: This file contains the function that generates the meta tags for the blog page.
// It returns a string with the meta tags for the blog page.

export default async function getBlogMetatags(blogData) {
    const { jsFile, cssFile } = (() => ({ jsFile: "/assets/index.js", cssFile: "/assets/index.css" }))();
    
    if (blogData && jsFile && cssFile) {
        return (
            `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="title" content="${blogData.title}">
    <meta name="description" content="${blogData.description || 'Filog is a blogging platform where users can create accounts, write articles, and share their blogs with the world. Join Filog and start blogging today! Crafting Narratives, Lighting the Way Forward.'}">
    <link rel="canonical" href=https://www.filog.in/blog/${} />

    
    <!-- Open Graph / Facebook Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${blogData.siteUrl}">
    <meta property="og:title" content="${blogData.title}">
    <meta property="og:description" content="${blogData.description || 'Filog is a blogging platform where users can create accounts, write articles, and share their blogs with the world. Join Filog and start blogging today! Crafting Narratives, Lighting the Way Forward.'}">
    <meta property="og:image" content="${blogData.imgUrl || '/path/to/default/image.webp'}">
    <meta property="og:site_name" content="Filog">

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${blogData.siteUrl}">
    <meta name="twitter:title" content="${blogData.title}">
    <meta name="twitter:description" content="${blogData.description || 'Filog is a blogging platform where users can create accounts, write articles, and share their blogs with the world. Join Filog and start blogging today! Crafting Narratives, Lighting the Way Forward.'}">
    <meta name="twitter:image" content="${blogData.imgUrl || '/path/to/default/image.webp'}">

    <!-- Additional Meta Tags -->
    <meta name="keywords" content="blogging, articles, write blogs, share blogs, create account, Filog, blogging platform">
    <meta name="author" content="Your Name or Your Company Name">
    <meta name="robots" content="index, follow">
    <link rel="icon" type="image/png" sizes="192x192" href="/meta/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png">
    <link rel="manifest" href="/meta/site.webmanifest">
    <link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <title>${blogData.title}</title>
    <script type="module" crossorigin src="${jsFile}"></script>
    <link rel="stylesheet" crossorigin href="${cssFile}">
  </head>
  <body class="dark:bg-darkPrimary min-h-screen">
    <div id="root"></div>
  </body>
</html>`
        );
    } else {
        return null;
    }
}
