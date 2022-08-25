import {
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteUserStart,
  filterUserStart,
  loadUsersStart,
  sortUserStart,
} from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: any) => state.data);
  const [sortValue, setSortValue] = useState("");
  const sortOptions = ["Name", "Email", "Phone", "Address", "Status"];

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  // useEffect(() => error && toast.error(error), [error]);

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role='status'>
        <span className='visually-hidden'>...loading</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserStart(id));
      toast.success(`User deleted successfully`);
    }
  };

  const handleFliter = (value) => {
    dispatch(filterUserStart(value));
  };

  const onSortChange = (e) => {
    let lowerSortValue = e.target.value.toLowerCase();
    if (sortOptions.includes(e.target.value)) {
      setSortValue(lowerSortValue);
      dispatch(sortUserStart(lowerSortValue));
    } else {
      dispatch(loadUsersStart());
      setSortValue("");
    }
  };

  return (
    <MDBContainer>
      <div className='container' style={{ marginTop: "150px" }}>
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope='col'>No.</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Address</th>
              <th scope='col'>Status</th>
              <th scope='col'>Action</th>
            </tr>
          </MDBTableHead>
          {users &&
            users.map((item, idex) => (
              <MDBTableBody key={idex}>
                <tr>
                  <th scope='row'>{idex + 1}</th>
                  <th scope='row'>{item.name}</th>
                  <th scope='row'>{item.email}</th>
                  <th scope='row'>{item.phone}</th>
                  <th scope='row'>{item.address}</th>
                  <th scope='row'>{item.status}</th>
                  <th scope='row'>
                    <MDBBtn
                      className='m-1'
                      tag='a'
                      color='none'
                      onClick={() => handleDelete(item.id)}
                    >
                      <MDBTooltip title='Delete' tag='a'>
                        <MDBIcon
                          fas
                          icon='trash'
                          style={{ color: "#dd4b39" }}
                          size='lg'
                        />
                      </MDBTooltip>
                    </MDBBtn>{" "}
                    <Link to={`/editUser/${item.id}`}>
                      <MDBTooltip title='Edit' tag='a'>
                        <MDBIcon
                          fas
                          icon='pen'
                          style={{ color: "#55acee", marginBottom: "10px" }}
                          size='lg'
                        />
                      </MDBTooltip>
                    </Link>{" "}
                    <Link to={`/userInfo/${item.id}`}>
                      <MDBTooltip title='View' tag='a'>
                        <MDBIcon
                          fas
                          icon='eye'
                          style={{ color: "#3b5998", marginBottom: "10px" }}
                          size='lg'
                        />
                      </MDBTooltip>
                    </Link>
                  </th>
                </tr>
              </MDBTableBody>
            ))}
        </MDBTable>
      </div>
      <MDBRow>
        <MDBCol size='8'>
          <h5>Sort By:</h5>
          <select
            style={{
              width: "100%",
              height: "35px",
              borderRadius: "4px",
              color: "#4f4f4f",
              borderColor: "#bdbdbd",
              padding: "2px 5px",
            }}
            onChange={(e) => onSortChange(e)}
            value={sortValue}
          >
            <>
              <option>Please select a status </option>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </>
          </select>
        </MDBCol>
        <MDBCol size='4'>
          <h5>Filter by status:</h5>
          <MDBBtnGroup>
            <MDBBtn color='success' onClick={() => handleFliter("active")}>
              Active
            </MDBBtn>
            <MDBBtn
              style={{ marginLeft: "2px" }}
              color='danger'
              onClick={() => handleFliter("inactive")}
            >
              Inactive
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Home;
