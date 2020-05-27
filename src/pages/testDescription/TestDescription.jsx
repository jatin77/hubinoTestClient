import React from "react";
import Paper from "@material-ui/core/Paper";
import "./testDesc.style.css";

function TestDescription() {
  return (
    <div className="container m-auto my-16  m-auto">
      <Paper elevation={3} className="mx-3 p-10">
        <p className="text-2xl pb-5 ">Test Description</p>
        <ol>
          <li>
            1 - Implement three modules with redux architecture, <br />
            Page be
            <ol className="p-3">
              <li>
                Add a customer <br />
                Get customer information with basic form (name, customer id,
                email, phone, gender ) and store it on the redux store. A page
                will be like <br />
                <a
                  className="text-blue-500"
                  target="_blank"
                  href="https://cdn-images-1.medium.com/max/1600/1*7f9OsH5p4Xz3_sfXYtzQzw.png"
                >
                  https://cdn-images-1.medium.com/max/1600/1*7f9OsH5p4Xz3_sfXYtzQzw.png
                </a>
              </li>
              <br />
              <li>
                Customers page List the customers from the redux store A page
                will be like <br />
                <a
                  className="text-blue-500"
                  target="_blank"
                  href=" https://dribbble.com/shots/2835464-Task-List-Dashboard/attachments/582822"
                >
                  https://dribbble.com/shots/2835464-Task-List-Dashboard/attachments/582822
                </a>
              </li>
              <br />
              <li>
                Update a customer <br />
                Update customer information with basic form and store it on the
                redux store.
              </li>
              <br />
              <li>Insert all the redux store data to mysql DB with node js.</li>
            </ol>
          </li>
          <br />
          <li>2 - React-router4 should be implemented </li>
          <br />
          <li>
            3 - Implement child components for all input fields like text box,
            select box.
          </li>
          <br />
          <li>4 - Implement HOC (Optional)</li>
        </ol>
      </Paper>
    </div>
  );
}

export default TestDescription;
