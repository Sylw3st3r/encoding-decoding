import * as Yup from "yup";
import classes from "./Form.module.css";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import { useState } from "react";
import CheckBox from "./CheckBox";
import {
    fourSquareDecode,
    fourSquareEncode,
} from "../Scripts/fourSquareCipher";

export default function FourSquareCipher() {
    const [encode, setEncoded] = useState("");

    const validate = Yup.object({
        message: Yup.string().required("Message required"),
        key: Yup.string()
            .trim()
            .matches(
                /^[a-ik-zA-IK-Z]+$/,
                "Key can contain only a-z characters without j"
            ),
        key2: Yup.string()
            .trim()
            .matches(
                /^[a-ik-zA-IK-Z]+$/,
                "Key can contain only a-z characters without j"
            ),
        decode: Yup.bool(),
    });

    return (
        <Formik
            initialValues={{
                message: "",
                key: "",
                key2: "",
                decode: false,
            }}
            validationSchema={validate}
            onSubmit={values => {
                if (!values.message.trim().length) {
                    setEncoded("");
                } else if (values.decode === false) {
                    setEncoded(
                        fourSquareEncode(
                            values.message,
                            values.key,
                            values.key2
                        )
                    );
                } else {
                    setEncoded(
                        fourSquareDecode(
                            values.message,
                            values.key,
                            values.key2
                        )
                    );
                }
            }}
        >
            {formik => (
                <div className={classes.container}>
                    <Form className={classes.form}>
                        <h1>Four Square</h1>
                        <TextField label="Message" name="message" type="text" />
                        <TextField label="Key" name="key" type="text" />
                        <TextField label="Key2" name="key2" type="text" />
                        <CheckBox label="Decode" name="decode" />
                        <p>Encoded/decoded message:</p>
                        <p>{`${encode}`}</p>
                        <button className={classes["submit-btn"]} type="submit">
                            Encode/Decode
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
