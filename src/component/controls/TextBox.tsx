import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type props={
  placeholder:string,
  register:UseFormRegister<FieldValues>,
  name:string,
  errors:FieldErrors<FieldValues>
}

const TextBox = ({placeholder,register,name,errors}:props) => {
  return (
    <div className="mb-5">
      <input
        type="text"
        placeholder={placeholder}
        {...register(name)}
        className="bg-blue-100 w-full shadow-inner text-gray-700 border-b-2 border-blue-300 font-medium rounded-2xl px-4 py-3 outline-none"
      />
      <div className="text-red-600 text-left ml-5">{errors[name]?.message as string}</div>
    </div>
  );
};

export default TextBox;
