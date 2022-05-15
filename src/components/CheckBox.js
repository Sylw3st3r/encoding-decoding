import React from "react";
import { ErrorMessage, useField } from "formik";
import classes from "./Checkbox.module.css";

export default function CheckBox({ label, ...props }) {
    const [field, meta] = useField(props);

    const classesNames = `${classes.textField} ${
        meta.touched && meta.error && classes.isInvalid
    }`;

    return (
        <div className={classes.container}>
            <label className={classes.label} htmlFor={field.name}>
                {label}
            </label>
            <input
                className={classesNames}
                type="checkbox"
                placeholder={label}
                {...field}
                {...props}
            />
            <ErrorMessage
                component="div"
                name={field.name}
                className={classes.error}
            />
        </div>
    );
}
