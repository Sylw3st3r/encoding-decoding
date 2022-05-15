import * as Yup from "yup";
import classes from "./Form.module.css";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import { useState } from "react";
import { atbash } from "../Scripts/AtbashCipher";

export default function Atbash() {
    const [encode, setEncoded] = useState("");

    const validate = Yup.object({
        message: Yup.string().required("Message required"),
    });

    return (
        <Formik
            initialValues={{
                message: "",
            }}
            validationSchema={validate}
            onSubmit={values => {
                if (!values.message.trim().length) {
                    setEncoded("");
                } else {
                    setEncoded(atbash(values.message));
                }
            }}
        >
            {formik => (
                <div className={classes.container}>
                    <Form className={classes.form}>
                        <h1>Atbash</h1>
                        <TextField label="Message" name="message" type="text" />
                        <p>Encoded/decoded message:</p>
                        <p>{encode}</p>
                        <button className={classes["submit-btn"]} type="submit">
                            Encode/Decode
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
