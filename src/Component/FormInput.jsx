import PropTypes from "prop-types";
import { Input } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import { FaAsterisk } from "react-icons/fa";

export default function FormInput({
  title = null,
  type = "text",
  value = "",
  className = "",
  change = () => {},
  error = "",
  required = false,
}) {
  return (
    <div className={`flex flex-col ${title ? "gap-1" : "gap-0 items-center"} `}>
      <div className="flex items-center  gap-0.5">
        <label htmlFor="" className="text-xs font-medium 2xl:text-sm  ">
          {title}
        </label>
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <span className={`relative ${className} `}>
        <Input
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
          type={type}
          placeholder={`Enter ${title}`}
          value={value}
          onChange={(e) => {
            change(e.target.value);
            console.log(e.target.value);
          }}
          className={`w-full ${error ? "border-rose-400" : ""}`}
          status={error ? "error" : ""}
          style={
            error
              ? {
                  boxShadow:
                    "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }
              : {}
          }
        />

        {error && (
          <FiAlertCircle
            className={`absolute top-2.5 right-2 mr-3 transform -translate-y-1/5 text-red-400`}
          />
        )}

        {error && (
          <p className="flex justify-start items-center  mb-0 text-[10px] text-red-600">
            <span className="text-[10px] pt-2">{error}</span>
          </p>
        )}
      </span>
    </div>
  );
}
FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  change: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
};
