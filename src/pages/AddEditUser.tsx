import { MDBBtn, MDBInput, MDBValidation } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserStart, updateUserStart } from "../redux/actions";

const initialState = {
  name: "",
  email: "",
  address: "",
  phone: "",
  status: "",
};

const options = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

function AddEditUser() {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, email, address, phone, status } = formValue;
  const { users } = useSelector((state: any) => state.data);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const user = users.find((item) => item.id === Number(id));
      setFormValue({ ...user });
    } else {
      setEditMode(false);
      setFormValue(initialState);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && address && phone) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User added successfully");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUserStart({ id, userInfo: formValue }));
        setEditMode(false);
        toast.success("User updated successfully");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onDropdownChange = (e) => {
    setFormValue({ ...formValue, status: e.target.value });
  };

  return (
    <MDBValidation
      className='row g-3'
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className='fs-2 fw-bold'>
        {!editMode ? "Add User Detial" : "Update User Detial"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name || ""}
          name='name'
          type='text'
          onChange={(e) => onInputChange(e)}
          required
          label='Name'
        />
        <br />
        <MDBInput
          value={email || ""}
          name='email'
          onChange={(e) => onInputChange(e)}
          required
          label='Email'
          type='email'
        />
        <br />
        <MDBInput
          value={phone || ""}
          name='phone'
          onChange={(e) => onInputChange(e)}
          required
          label='Phone'
          type='number'
        />
        <br />
        <MDBInput
          value={address || ""}
          name='address'
          type='text'
          onChange={(e) => onInputChange(e)}
          required
          label='Address'
        />
        <br />
        <select
          style={{
            width: "100%",
            height: "35px",
            borderRadius: "4px",
            color: "#4f4f4f",
            borderColor: "#bdbdbd",
            padding: "2px 5px",
          }}
          onChange={(e) => onDropdownChange(e)}
        >
          <>
            <option>Please select a status </option>
            {options.map((options) => (
              <option
                value={options.value || ""}
                selected={options.value === status ? true : false}
              >
                {options.label}
              </option>
            ))}
          </>
        </select>
        <br />
        <br />
        <div className='col-12'>
          <MDBBtn style={{ marginRight: "10px" }} type='submit'>
            {!editMode ? "Add" : "Update"}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color='danger'>
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
}

export default AddEditUser;
