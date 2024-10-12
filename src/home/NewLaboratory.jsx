import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { Button, Drawer } from "antd";
import PropTypes from "prop-types";
import FormInput from "../Component/FormInput";
import DropDownSelect from "../Component/DropDownSelect";
import { status } from "../data/data";
import { addLab, editLab } from "../redux/labSlice";
import { useMemo, useState } from "react";

export default function NewLaboratory({
  labId,
  open = false,
  close = () => {},
}) {
  const [show, setShow] = useState(open);

  useMemo(
    () =>
      setTimeout(() => {
        show === false && close(false);
      }, 800),
    [show]
  );
  const handleClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();
  const labData = useSelector((state) =>
    state.labs.labs.find((lab) => lab.id === labId)
  );
  console.log("Lab Data:", labData);

  const formik = useFormik({
    initialValues: {
      laboratoryName: labData?.name || "",
      city: labData?.city || "",
      cluster: labData?.cluster || "",
      availableEquipment: labData?.availableEquipment.join(", ") || "",
      viscosity: Number(labData?.fuelOilParameters?.viscosity) || "", // Convert to number
      sulfurContent:
        parseFloat(labData?.fuelOilParameters?.sulfurContent) || "", // Convert to float
      waterContent: parseFloat(labData?.fuelOilParameters?.waterContent) || "", // Convert to float
      flashPoint: parseFloat(labData?.fuelOilParameters?.flashPoint) || "", // Convert to float
      status: labData?.status || "Live",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: Yup.object({
      laboratoryName: Yup.string().required("Laboratory Name is required"),
      city: Yup.string().required("City is required"),
      cluster: Yup.string().required("Cluster is required"),
      availableEquipment: Yup.string().required(
        "Available Equipment is required"
      ),
      viscosity: Yup.number()
        .required("Viscosity is required")
        .positive("Viscosity must be a positive number"),
      sulfurContent: Yup.number()
        .required("Sulfur Content is required")
        .min(0, "Sulfur Content must be 0 or higher"),
      waterContent: Yup.number()
        .required("Water Content is required")
        .min(0, "Water Content must be 0 or higher"),
      flashPoint: Yup.number()
        .required("Flash Point is required")
        .positive("Flash Point must be a positive number"),
      status: Yup.string().oneOf(
        ["Live", "Under Maintenance"],
        "Invalid status"
      ),
    }),
    onSubmit: (values) => {
      if (!labId) {
        const newLab = {
          id: Math.random(), // For simplicity, using random ID
          name: values.laboratoryName,
          city: values.city,
          cluster: values.cluster,
          availableEquipment: values.availableEquipment
            .split(",")
            .map((item) => item.trim()), // Convert string back to array
          fuelOilParameters: {
            viscosity: Number(values.viscosity),
            sulfurContent: parseFloat(values.sulfurContent), // Ensure it's a number
            waterContent: parseFloat(values.waterContent), // Ensure it's a number
            flashPoint: parseFloat(values.flashPoint), // Ensure it's a number
          },
          status: values.status,
        };
        dispatch(addLab(newLab));
        handleClose();
      } else {
        const updatedData = {
          id: labId,
          name: values.laboratoryName,
          city: values.city,
          cluster: values.cluster,
          availableEquipment: values.availableEquipment
            .split(",")
            .map((item) => item.trim()), // Convert string back to array
          fuelOilParameters: {
            viscosity: Number(values.viscosity),
            sulfurContent: parseFloat(values.sulfurContent), // Ensure it's a number
            waterContent: parseFloat(values.waterContent), // Ensure it's a number
            flashPoint: parseFloat(values.flashPoint), // Ensure it's a number
          },
          status: values.status,
        };

        dispatch(editLab(updatedData));
        handleClose();
      }
    },
  });
  return (
    <Drawer
      title="Basic Drawer"
      open={show}
      onClose={handleClose}
      footer={
        <div className=" flex justify-between">
          <Button type="default" onClick={handleClose}>
            cancle
          </Button>
          <Button type="primary" onClick={formik.handleSubmit}>
            Submit
          </Button>
        </div>
      }
    >
      <form className=" flex flex-col gap-6">
        {/* Laboratory Name */}
        <FormInput
          id="laboratoryName"
          title="Laboratory Name"
          type="text"
          change={(value) => formik.setFieldValue("laboratoryName", value)} // Set the value
          value={formik.values.laboratoryName}
          error={formik.errors.laboratoryName}
        />
        <FormInput
          id="city"
          title="City"
          type="text"
          change={(value) => formik.setFieldValue("city", value)} // Set the value
          value={formik.values.city}
          error={formik.errors.city}
        />
        <FormInput
          id="cluster"
          title="Cluster"
          type="text"
          change={(value) => formik.setFieldValue("cluster", value)} // Set the value
          value={formik.values.cluster}
          error={formik.errors.cluster}
        />
        <FormInput
          id="availableEquipment"
          title="Available Equipment"
          type="text"
          change={(value) => formik.setFieldValue("availableEquipment", value)} // Set the value
          value={formik.values.availableEquipment}
          error={formik.errors.availableEquipment}
        />
        <FormInput
          id="viscosity"
          title="Viscosity"
          type="number"
          change={(value) => formik.setFieldValue("viscosity", value)} // Set the value
          value={formik.values.viscosity}
          error={formik.errors.viscosity}
        />
        <FormInput
          id="sulfurContent"
          title="Sulfur Content"
          type="number"
          change={(value) => formik.setFieldValue("sulfurContent", value)} // Set the value
          value={formik.values.sulfurContent}
          error={formik.errors.sulfurContent}
        />
        <FormInput
          id="waterContent"
          title="Water Content"
          type="number"
          change={(value) => formik.setFieldValue("waterContent", value)} // Set the value
          value={formik.values.waterContent}
          error={formik.errors.waterContent}
        />
        <FormInput
          id="flashPoint"
          title="Flash Point"
          type="number"
          change={(value) => formik.setFieldValue("flashPoint", value)} // Set the value
          value={formik.values.flashPoint}
          error={formik.errors.flashPoint}
        />
        {/* Status */}
        <DropDownSelect
          id="status"
          title="Status"
          change={(value) => formik.setFieldValue("status", value)} // Set the value
          value={formik.values.status}
          error={formik.errors.status}
          options={status}
        />

        {/* Submit Button */}
      </form>
    </Drawer>
  );
}

NewLaboratory.propTypes = {
  open: PropTypes.bool.isRequired,
  labId: PropTypes.string,
  close: PropTypes.func,
};
