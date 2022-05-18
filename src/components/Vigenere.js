import * as Yup from "yup";
import classes from "./Form.module.css";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import { useState } from "react";
import { vigenereEncode, vigenereDecode } from "../Scripts/vigenereCipher";
import CheckBox from "./CheckBox";

export default function Vigenere() {
    const [encode, setEncoded] = useState("");

    const onClickHandler = () => {
        navigator.clipboard.writeText(encode);
    };

    const validate = Yup.object({
        message: Yup.string().required("Message required"),
        key: Yup.string()
            .trim()
            .matches(/^[a-zA-Z]+$/, "Key can contain only a-z characters")
            .required("Key required"),
        decode: Yup.bool(),
    });

    return (
        <Formik
            initialValues={{
                message: "",
                key: "",
                decode: false,
            }}
            validationSchema={validate}
            onSubmit={values => {
                if (!values.message.trim().length) {
                    setEncoded("");
                } else if (values.decode) {
                    setEncoded(vigenereDecode(values.message, values.key));
                } else {
                    setEncoded(vigenereEncode(values.message, values.key));
                }
            }}
        >
            {formik => (
                <div className={classes.container}>
                    <Form className={classes.form}>
                        <h1>Vigenere</h1>
                        <TextField label="Message" name="message" type="text" />
                        <TextField label="Key" name="key" type="text" />
                        <CheckBox label="Decode" name="decode" />
                        <p>Encoded/decoded message:</p>
                        <p onClick={onClickHandler}>{encode}</p>
                        <button className={classes["submit-btn"]} type="submit">
                            Encode/Decode
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
