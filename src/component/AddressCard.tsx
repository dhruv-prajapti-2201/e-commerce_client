import React from "react";
import { addressType } from "./Summery";

type props={
    closeAddressModel: () => void,
    address:addressType
}

const AddressCard = ({closeAddressModel,address}:props) => {
  return (
    <div>
      <div className="text-left flex items-center justify-between">
        <div>Delivery Address :</div>
        <div
          onClick={closeAddressModel}
          className="text-lg font-bold cursor-pointer"
        >
          X
        </div>
      </div>
      <table className="user-table">
        <tbody>
          <tr>
            <td>Address line 1 :</td>
            <td> {address?.address1}</td>
          </tr>
          {address?.address2 !== "" && (
            <tr>
              <td>Address line 2 :</td>
              <td>{`${address?.address2}`}</td>
            </tr>
          )}
          <tr>
            <td>Country :</td>
            <td>{address?.country}</td>
          </tr>
          <tr>
            <td>City :</td>
            <td>{address?.city}</td>
          </tr>
          <tr>
            <td>Pincode :</td>
            <td>{address?.pincode}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddressCard;
