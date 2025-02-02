import React from "react";
import { Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Form from "./Form";

const FormWithDrawer = (props) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const anchor = props.anchor ? props.anchor : "right";
  const actionBtnName = props.actionBtnName;
  const data = props.data;
  const buttonVarient = props.buttonVarient ? props.buttonVarient : "contained";
  const updateFormTitle = props.updateFormTitle ? props.updateFormTitle : "";
  const createFormTitle = props.createFormTitle ? props.createFormTitle : "";
  const submitBtnTitle = props.submitBtnTitle ? props.submitBtnTitle : "Submit";
  const handleCloseDrawer = () => {
    setState({ ...state, [anchor]: false });
  };

  return (
    <React.Fragment key={anchor}>
      <Button
        onClick={toggleDrawer(anchor, true)}
        variant={buttonVarient}
        style={props.buttonStyle}
      >
        {actionBtnName}
      </Button>

      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <div className="row" style={{ width: "470px" }}>
          <div
            className="col-md-12"
            style={{ textAlign: "center", color: "#333", padding: "10px" }}
          >
            <h4>{createFormTitle}</h4>
            <h4>{updateFormTitle}</h4>
            <hr />
            <div>
              <Form
                globalConfig={props.globalConfig}
                token={props.token}
                closeDrawer={handleCloseDrawer}
                refreshData={() => props.refreshData()}
                submitBtnTitle={submitBtnTitle}
                inputFields={props.inputFields}
                api={props.api}
                data={data}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default FormWithDrawer;
