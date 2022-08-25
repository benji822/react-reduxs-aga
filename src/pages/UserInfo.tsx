import { MDBBtn } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UserInfo() {
  const { users } = useSelector((state: any) => state.data);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const singleUser = users.find((user) => user.id === Number(id));

  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className='row'
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
          alignContent: "center",
        }}
      >
        <p className='col-md-12 fs-3'>User Detail</p>
        <hr />
        <p className='col-md-6 fw-bold'>ID:</p>
        <p className='col-md-6'>{singleUser.id}</p>
        <p className='col-md-6 fw-bold'>Name:</p>
        <p className='col-md-6'>{singleUser.name}</p>
        <p className='col-md-6 fw-bold'>Email:</p>
        <p className='col-md-6'>{singleUser.email}</p>
        <p className='col-md-6 fw-bold'>Contact:</p>
        <p className='col-md-6'>{singleUser.phone}</p>
        <p className='col-md-6 fw-bold'>Address:</p>
        <p className='col-md-6'>{singleUser.address}</p>
      </div>
      <MDBBtn onClick={() => navigate("/")} color='danger'>
        Go Back
      </MDBBtn>
    </div>
  );
}

export default UserInfo;
