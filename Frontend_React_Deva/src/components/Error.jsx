/* eslint-disable react/prop-types */
const Error = (props) => {
  const { error } = props;
  return <>{error && <small className="p-error">{error}</small>}</>;
};
export default Error;
