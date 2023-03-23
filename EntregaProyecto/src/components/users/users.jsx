import React from "react";
import MUIDataTable from "mui-datatables";

function Users(props) {
  let data = props.users;
  const columns = [
    {
        name: "id",
        label: "Id",
        options: {
          filter: true,
          sort: true,
        },
      },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <MUIDataTable
      title={"Users List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default Users;
