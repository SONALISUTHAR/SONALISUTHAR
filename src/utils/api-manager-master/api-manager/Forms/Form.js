import React, { useState } from "react";
import { Button } from "@mui/material";
import { validateField } from "../Helper/helper";
import "../Style/style.css";
import { toast } from "react-toastify";
import useApi from "../Helper/useApi";
import HGetField from "../Fields/HGetField";

const Form = (props) => {
  const inputFields = props.inputFields;
  const fieldDefault = props.data ? props.data : [];
  const submitBtnTitle = props.submitBtnTitle ? props.submitBtnTitle : "Submit";
  const [multiSelect, setMultiSelect] = useState([]);

  const { Patch, Post } = useApi();
  async function handleSubmit(e) {
    e.preventDefault();
    let isFormValid = true;
    const newExternalErrors = {};
    inputFields.forEach((field) => {
      const fieldName = field.name;
      let value;
      if (field.type === "parent-child") {
        field.fields.forEach((_f) => {
          let _fname = _f.name;
          value = e.target.elements[_fname].value;
        })

      } else {
        value = e.target.elements[fieldName].value;
      }


      if (field.type === "multi-select") {
        setMultiSelect((prevData) => [...prevData, fieldName]);
      }

      validateField(value, field.type, field.label);


      if (field.required) { // Check if the field is required
        const validationError = validateField(value, field.type, field.label);
        if (validationError) {
          newExternalErrors[fieldName] = validationError;
          toast.error(validationError);
          isFormValid = false;
        }
      }
    });

    if (!isFormValid) {
      return; // Don't submit if form is invalid
    }

    var data = new FormData(e.target);
    let formData = Object.fromEntries(data.entries());
    multiSelect.map(async (f) => {
      formData[f] = JSON.parse(formData[f]);
    })

    if (fieldDefault["id"]) {

      try {
        await Patch(props.api, fieldDefault["id"], formData).then(() => {
          props.closeDrawer();
          props.refreshData();
          toast.success("Record updated successfully!");
        })
          .catch((err) => {
            toast.error(err || "Error");
          });
      } catch {
        toast.error("Something Went wrong contact Humbingo");
      }
    } else {


      try {
        await Post(props.api, formData).then(() => {
          props.closeDrawer();
          props.refreshData();

          toast.success("Record created successfully!");
        })
          .catch((err) => {
            console.error(err);
            toast.error(err.response?.data?.error || "Error");
          });
      } catch {
        toast.error("Something Went wrong contact Humbingo");
      }
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      {inputFields.map((field, index) => {
        const fieldName = field["name"];
        if (props.grid) {
          return (
            <div className={props.grid}>
              <div className="dynamic-form-element" key={index}>
                <HGetField
                  globalConfig={props.globalConfig}
                  token={props.token}
                  field={field}
                  name={index}
                  defaultValue={fieldDefault[fieldName]}
                  handleChange={props.handleChange}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div className="dynamic-form-element" key={index}>
              <HGetField
                globalConfig={props.globalConfig}
                token={props.token}
                field={field}
                name={index}
                defaultValue={fieldDefault[fieldName]}
                handleChange={props.handleChange}
              />
            </div>
          );
        }
      })}
      <br />
      <Button variant="contained" type="submit" size="small">
        {submitBtnTitle}
      </Button>
    </form>
  );
};
export default Form;
