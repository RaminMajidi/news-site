import { useContext } from "react"
import "./Information.css"
import { Link } from "react-router-dom"
import InfoItem from "./InfoItem"
import userImage from "@src/assets/images/profile.png"
import { AdminContext } from "../../../context/context"

const Information = () => {

  const { userData } = useContext(AdminContext)

  return (
    <div className="information">
      <div className="view-web is-flex is-justify-content-space-between is-align-items-center">
        <div className="view-webpage">
          <a className="button has-background-info has-text-light" href="/">مشاهده وب سایت</a>
        </div>
        <div className="view-profile">
          <Link to={''}>
            <img
              className="image profile-photo"
              src={userData?.url || userImage}
              alt={`user-image`} />
          </Link>
        </div>
      </div>

      <div className="is-flex is-align-item-center is-justify-content-space-between py-4">
        <InfoItem
          title={'خبرها'}
          value={"16"}
          iconName={'news'}
          classStyle={'has-background-danger has-text-light p-5 '}
        />

        <InfoItem
          title={'کاربران'}
          value={"8"}
          iconName={'group'}
          classStyle={'has-background-info has-text-light p-5'}
        />

        <InfoItem
          title={'نظرات'}
          value={"12"}
          iconName={'message-dots'}
          classStyle={'has-background-success has-text-light p-5 '}
        />
      </div>
    </div>
  )
}

export default Information