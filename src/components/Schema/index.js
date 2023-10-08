import * as Yup from "yup";

export const AddcourseSchema =Yup.object({
    courseName: Yup.string().min(2).max(80).required("Plz Enter course Name!") ,
    code: Yup.string().min(2).max(60).required("Plz Enter course Name!") ,
   
    quantity:Yup.number().positive().integer().required("Plz Enter course code!") ,
   
})
