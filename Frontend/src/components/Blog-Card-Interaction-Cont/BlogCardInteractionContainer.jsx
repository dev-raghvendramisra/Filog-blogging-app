import React from 'react';
import { NavLink } from 'react-router-dom';
import { BlogCard, BlogInteraction,GenToast } from '../../components';
import Dropdown from '../Dropdown/Dropdown';
import { getSharableLink } from '../../utils';
import toast from 'react-hot-toast';

function BlogCardInteractionContainer({ 
  blogId, 
  authorName, 
  blogCardType, 
  userData, 
  userProfileId, 
  likeCount, 
  commentCount, 
  blogTitle, 
  blogTags, 
  authorAvatar, 
  createdAt, 
  blogImg, 
  updateLikes, 
  openModal, 
  blogsLiked 
}) {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  // Memoize uniqueId to avoid regeneration on every render
  const uniqueId = blogId;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const closeDropdown = (e) => {
      if (!document.getElementById(`BlogCard-wrapper-${uniqueId}`).contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    if (openDropdown) {
      document.addEventListener('click', closeDropdown);
    }
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [openDropdown, uniqueId]);

        const onClipboardError = React.useCallback(() =>{
          toast.custom(<GenToast type='err'>Failed to copy link to clipboard</GenToast>)
        },[])
        const onClipboardSuccess = React.useCallback(() =>{
          toast.custom(<GenToast type='success'>Link copied to clipboard</GenToast>)
        },[])

  const links = [
    {
      text: "Share on Twitter",
      icon: <i className="fa-brands fa-x-twitter"></i>,
      onClick:  getSharableLink({platform:"twitter", blogId, blogTitle, blogAuthor: authorName})
    },
    {
      text: "Share on WhatsApp",
      icon: <i className="fa-brands fa-whatsapp"></i>,
      onClick: getSharableLink({platform:"whatsapp", blogId, blogTitle, blogAuthor: authorName})
    },
    {
      text: "Share on Facebook",
      icon: <i className="fa-brands fa-facebook"></i>,
      onClick: getSharableLink({platform:"facebook", blogId, blogTitle, blogAuthor: authorName})
    },
    {
      text: "Share on LinkedIn",
      icon: <i className="fa-brands fa-linkedin"></i>,
      onClick: getSharableLink({platform:"linkedin", blogId, blogTitle, blogAuthor: authorName})
    },
    {
      text: "Copy blog link",
      icon: <i className="fa-solid fa-link"></i>,
      onClick: () => { 
        const clipBoardHandler = getSharableLink({clipboard: true,blogId, blogTitle, blogAuthor: authorName});
        clipBoardHandler(onClipboardError,onClipboardSuccess)
       }
    }
  ];

  return (
    <div id={`BlogCard-wrapper-${uniqueId}`} className='relative overflow-hidden'>
      {openDropdown && (
        <Dropdown 
          id={`BlogCard-shareDropdown-${uniqueId}`} 
          className="absolute top-0 z-20 drop-shadow-2xl overflow-hidden"  
          setOpenDropdown={setOpenDropdown}
        >
          {links}
        </Dropdown>
      )}

      <NavLink id={`blogLink-${blogId}`} to={`/blog/${blogId}`}>
        <div id={`BlogCard-scrim-card-cont-${uniqueId}`} className='relative rounded-3xl overflow-hidden'>
          {openDropdown && (
            <div 
              id={`BlogCard-scrim-${uniqueId}`} 
              className='scrimAnim transition-all h-full w-full bg-opacity-50 backdrop-blur-sm absolute opacity-100 z-10 bg-white dark:bg-black dark:bg-opacity-20 top-0 left-0'>
            </div>
          )}
          <BlogCard
            type={blogCardType}
            title={blogTitle}
            tags={blogTags}
            coverImage={blogImg}
            author={authorName}
            authorImg={authorAvatar}
            createdAt={createdAt}
            uniqueId={uniqueId}
          />
        </div>
      </NavLink>

      <BlogInteraction
        userData={userData}
        userProfileId={userProfileId}
        blogId={blogId}
        openModal={openModal}
        authorName={authorName}
        likeCount={likeCount}
        commentCount={commentCount}
        blogImg={blogImg}
        liked={blogsLiked.includes(blogId)}
        updateLikes={updateLikes}
        setOpenDropdown={setOpenDropdown}
        uniqueId={uniqueId}
      />
    </div>
  );
}

export default BlogCardInteractionContainer;
