import { useContext, useEffect } from "react"
import "./Information.css"
import { Link } from "react-router-dom"
import InfoItem from "./InfoItem"
import userImage from "@src/assets/images/profile.png"
import { AdminContext } from "@src/admin/context/context"

const Information = () => {

  const { userData, userList, newsData, commentList, getAllComment, getAllNews, getAllUser } = useContext(AdminContext)

  useEffect(() => {
    getAllComment()
    getAllNews()
    getAllUser()
  }, [])

  return (
    <div className="information my_container">
      <div className="view-web is-flex is-justify-content-space-between 
      is-align-items-center px-4">
        <div className="view-webpage">
          <a className="button has-background-info has-text-light"
            href="/" target="_blank">مشاهده وب سایت</a>
        </div>
        <div className="view-profile">
          <Link to={`/edit-profile/${userData?.id}`}>
            <img
              className="image profile-photo"
              src={userData?.url || userImage}
              alt={`user-image`} />
          </Link>
        </div>
      </div>

      <div className="is-flex is-flex-wrap-wrap is-align-item-center 
        is-justify-content-space-between py-4">
        <InfoItem
          title={'خبرها'}
          value={newsData?.length}
          iconName={'news'}
          classStyle={'has-background-danger has-text-light p-5 '}
        />

        <InfoItem
          title={'کاربران'}
          value={userList?.length}
          iconName={'group'}
          classStyle={'has-background-info has-text-light p-5'}
        />

        <InfoItem
          title={'نظرات'}
          value={commentList?.length}
          iconName={'message-dots'}
          classStyle={'has-background-success has-text-light p-5 '}
        />
      </div>
    </div>
  )
}

export default Information