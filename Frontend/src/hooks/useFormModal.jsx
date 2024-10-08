import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useModalActionsContext from '../context/modalActionsContext';
import { setInputFeild_1Error, setInputFeild_1Value, setInputFeild_2Value, setInputFeild_2Error, setInputFeild_3Value, setInputFeild_3Error, clearModal, setCtaDisabled, setCtaLoading, setFeedbackMessage } from '../store/formModalSlice'
import { commentOnBlog } from '../store/blogsSlice'
import { getFormModal, getImgUrl } from '../utils';
import { ID } from 'appwrite';
import { dbServices } from '../services';
import toast from 'react-hot-toast';
import { GenToast } from '../components';
import { updateAvatar } from '../store/userProfileSlice';
import useFileObjectContext from '../context/fileObjectContext';

export default function useFormModal({
    modalId,
    heading,
    message,
    primaryBtnText,
    secondaryBtnText,
    ctaDanger,
    iconClass,
    charLimitForTextArea,
    inputFeildSpecs,
    primaryOnClick,
    secondaryOnClick,
    customCleanup = () => { } }) {

    const dispatch = useDispatch();
    const { addModalActionHandlers, removeModalActionHandlers } = useModalActionsContext();
    const [openForm, setOpenForm] = React.useState(false);

    React.useEffect(() => {
        if (openForm) {
            return getFormModal({ modalId, heading, message, primaryBtnText, secondaryBtnText, ctaDanger, iconClass, charLimitForTextArea, inputFeildSpecs, primaryOnClick, secondaryOnClick, dispatch, addModalActionHandlers })
        }
        dispatch(clearModal(modalId))
        removeModalActionHandlers(modalId)
        customCleanup()
    }, [openForm])


    return setOpenForm;

}

export function useCommentFormModal(userId, argHeading = "", argMessage = "", argPrimaryBtnText = "", argSecondaryBtnText = "") {
    const heading = argHeading || "Leave a comment";
    const message = argMessage || "Be respectful and keep your comments relevant to the topic.";
    const primaryBtnText = argPrimaryBtnText || "Post Comment";
    const secondaryBtnText = argSecondaryBtnText || "Cancel";
    const [modalId] = React.useState(ID.unique())
    const [blogId, setBlogId] = React.useState(null);
    const [authorId, setAuthorId] = React.useState(null);
    const [comment, setComment] = React.useState(null);
    const [localFeedbackMessage, setLocalFeedbackMessage] = React.useState(null);
    const [timer, setTimer] = React.useState(null);
    const minCharLength = 1;
    const maxCharLength = 500;
    const dispatch = useDispatch();
    const formModals = useSelector(state => state.formModals)
    const { addModalActionHandlers, removeModalActionHandlers } = useModalActionsContext();
    const userProfileId = useSelector(state => state.userProfile.$id)
    const inputFeildSpecs = [
        {
            type: "Type your comment here",//type will be used as placeholder in the input feilds without fill
            type2: "Your Comment",//type2 will be used as label in the input feilds without fill
            text_area: true,
        }
    ]


    const primaryOnClick = React.useCallback(async () => {
        const isValid = commentValidation(comment)
        if (!isValid) return;
        dispatch(setCtaLoading({ id: modalId, val: true }))
        dispatch(setCtaDisabled({ id: modalId, val: true }))

        const res = await dbServices.commentOnBlog(blogId, userId, comment, userProfileId, authorId)
        if (res.$id) {
            setLocalFeedbackMessage({ type: "success", message: "Commented posted successfully" })
            const newTimer = setTimeout(() => setOpenFormModal(false), 3000)
            setTimer(newTimer)
            dispatch(commentOnBlog(blogId))
        }
        else {
            if (res.res.code == 503) setLocalFeedbackMessage({ type: "err", message: "Service unavailable, please try again later" })
            if (res.res.code == 500) setLocalFeedbackMessage({ type: "err", message: "Internal server error, please try again later" })
            else setLocalFeedbackMessage({ type: "err", message: "Failed to post comment, please try again later" })
        }
        dispatch(setCtaLoading({ id: modalId, val: false }))
        dispatch(setCtaDisabled({ id: modalId, val: false }))
    }, [comment, blogId, authorId, userProfileId, userId])


    const secondaryOnClick = React.useCallback(() => {
        setOpenFormModal(false)
    }, [])

    const commentValidation = (comment) => {
        if (!comment) {
            dispatch(setInputFeild_1Error({ id: modalId, val: "Comment cannot be empty" }))
            return false;
        }
        if (comment.length < minCharLength) {
            dispatch(setInputFeild_1Error({ id: modalId, val: "Comment must be at least 10 characters long" }))
            return false;
        }
        if (comment.length > maxCharLength) {
            dispatch(setInputFeild_1Error({ id: modalId, val: "Comment must be at most 500 characters long" }))
            return false
        }
        return true;
    }

    const openFormModal = React.useCallback((isOpen, blogId, authorId) => {

        if (isOpen) {
            setBlogId(blogId)
            setAuthorId(authorId)
            setOpenFormModal(true)
        }
        else setOpenFormModal(false)
    }, [])

    const setOpenFormModal = useFormModal({ modalId, heading, message, primaryBtnText, secondaryBtnText, ctaDanger: false, iconClass: "far fa-comment", charLimitForTextArea: maxCharLength, inputFeildSpecs, primaryOnClick, secondaryOnClick })


    React.useEffect(() => {
        if (localFeedbackMessage) {
            toast.custom(<GenToast type={localFeedbackMessage.type}>{localFeedbackMessage.message}</GenToast>)
            dispatch(setFeedbackMessage({ id: modalId, feedbackMessage: localFeedbackMessage.message, type: localFeedbackMessage.type }))
        }

    }, [localFeedbackMessage])

    React.useEffect(() => {
        return () => clearTimeout(timer)
    }, [timer])

    React.useEffect(() => {
        if (formModals) {
            formModals.forEach((modal) => {
                if (modal.id == modalId) {
                    setComment(modal.inputFeild_1Value)
                }
            })
        }
    }, [formModals])

    React.useEffect(() => {
        removeModalActionHandlers(modalId)
        addModalActionHandlers({ [modalId]: { primaryOnClick, secondaryOnClick } })
    }, [comment])

    return openFormModal;

}

export function useAvatarFormModal(argHeading = "", argMessage = '', argPrimaryBtnText = '', argSecondaryBtnText = '') {

    const heading = argHeading || "Change Avatar";
    const message = argMessage || "Choose a new avatar from your device by clicking on your avatar below or by dragging and dropping an image!";
    const primaryBtnText = argPrimaryBtnText || "Upload Avatar";
    const secondaryBtnText = argSecondaryBtnText || "Cancel";

    const [modalId] = React.useState(ID.unique())
    const [localFeedbackMessage, setLocalFeedbackMessage] = React.useState(null);
    const [timer, setTimer] = React.useState(null);
    const { addModalActionHandlers, removeModalActionHandlers } = useModalActionsContext();
    const { fileObject: avatar, setFileObject } = useFileObjectContext()
    const dispatch = useDispatch();

    const { $id: userProfileId, fullName, userId, userAvatarId: currentUserAvatar } = useSelector(state => state.userProfile)
    const inputFeildSpecs = [
        {
            type: "file",
            message: null,
            height: "16vw",
            width: "16vw",
            circular: true,
            imageName: `${fullName}-avatar-${userId}`,
            imgsrc: getImgUrl(currentUserAvatar).url,
        }
    ]



    const primaryOnClick = React.useCallback(async () => {
        if (!avatar) return setLocalFeedbackMessage({ type: "err", message: "Please select an image to upload" })
        dispatch(setCtaLoading({ id: modalId, val: true }))
        dispatch(setCtaDisabled({ id: modalId, val: true }))
        const imageUploadRes = await dbServices.changeAvatar(avatar, userId, userProfileId, currentUserAvatar)
        if (imageUploadRes.$id) {
            setLocalFeedbackMessage({ type: "success", message: "Avatar updated successfully" })
            const newTimer = setTimeout(() => setOpenFormModal(false), 3000)
            setTimer(newTimer)
            dispatch(updateAvatar({ url: imageUploadRes.userAvatar, id: imageUploadRes.userAvatarId }))
            return dispatch(setCtaLoading({ id: modalId, val: false }))
        }
        if (imageUploadRes.res.code == 503) setLocalFeedbackMessage({ type: "err", message: "Service unavailable, please try again later" })
        if (imageUploadRes.res.code == 500) {
            setLocalFeedbackMessage({ type: "err", message: "Internal server error, please try again later" })
            const newTimer = setTimeout(() => setOpenFormModal(false), 3000)
            setTimer(newTimer)
        }
        else setLocalFeedbackMessage({ type: "err", message: "Failed to update avatar, please try again later" })
        dispatch(setCtaLoading({ id: modalId, val: false }))
        dispatch(setCtaDisabled({ id: modalId, val: false }))
    }, [avatar])

    const secondaryOnClick = React.useCallback(() => {
        setOpenFormModal(false)
    }, [])

    const setOpenFormModal = useFormModal({ modalId, heading, message, primaryBtnText, secondaryBtnText, ctaDanger: false, iconClass: "fa-solid fa-image-portrait", charLimitForTextArea: null, inputFeildSpecs, primaryOnClick, secondaryOnClick, customCleanup: () => setFileObject(null) })

    React.useEffect(() => {
        if (!localFeedbackMessage) return;
        toast.custom(<GenToast type={localFeedbackMessage.type}>{localFeedbackMessage.message}</GenToast>)
        dispatch(setFeedbackMessage({ id: modalId, feedbackMessage: localFeedbackMessage.message, type: localFeedbackMessage.type }))
    }, [localFeedbackMessage])

    React.useEffect(() => {
        return () => { clearTimeout(timer) }
    }, [timer])


    React.useEffect(() => {
        removeModalActionHandlers(modalId)
        addModalActionHandlers({ [modalId]: { primaryOnClick, secondaryOnClick } })
    }, [avatar])


    const openFormModal = React.useCallback((isOpen) => {
        if (isOpen) {
            setOpenFormModal(true)
        }
        else setOpenFormModal(false)
    }, [])

    return openFormModal;
}
