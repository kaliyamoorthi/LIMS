import PropTypes from "prop-types";
import { Select } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import { FaAsterisk } from "react-icons/fa";

export default function DropDownSelect({
  title = "",
  className = "",
  change = () => {},
  error = "",
  required = false,
  options = [],
}) {
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div
      className={`flex flex-col ${
        title ? "gap-1" : "gap-0 items-center"
      } w-full `}
    >
      <div className="flex items-center  gap-0.5">
        {title && (
          <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
            {title}
          </label>
        )}
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <span className={` ${className} `}>
        <Select
          className=" w-full"
          showSearch
          placeholder={`Select ${title}`}
          optionFilterProp="label"
          onChange={change}
          onSearch={onSearch}
          options={options}
        />

        {error && (
          <FiAlertCircle
            className={`absolute top-2.5 right-2 mr-3 transform -translate-y-1/5 text-red-400`}
          />
        )}

        {error && (
          <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
            <span className="text-[10px] pt-2">{error}</span>
          </p>
        )}
      </span>
    </div>
  );
}
DropDownSelect.propTypes = {
  title: PropTypes.string.isRequired,
  change: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array,
};
