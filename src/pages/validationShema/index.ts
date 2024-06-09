import * as yup from "yup";

export const signUpShema = yup.object().shape({
  cpassword: yup
    .string()
    .test("compare", "password mismatch!", (value, testContext) => {
      if (testContext.parent.password === value) {
        return true;
      }
      return false;
    }),

  phone: yup.string().test("phone", "must be valid number!", (phone) => {
    if ((isNaN(Number(phone)) || phone?.length !== 10) && phone) {
      return false;
    }

    return true;
  }),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required("must be required!"),

  password: yup.string().required("must be required!"),
});

export const addressSchema = yup.object().shape({

  address1: yup.string().nullable().required('must be required!'),
  address2: yup.string().nullable(),
  country:yup.string().required('country is required!'),
  city:yup.string().required('city is required!'),
  state:yup.string().required('state is required!'),
  pincode:yup.string().required('pincode is required!').test('type','must be valid pincode',(pincode)=>{
    
    if(isNaN(Number(pincode)) || pincode.length!==6){
      return false
    }

    return true

  }),
});
