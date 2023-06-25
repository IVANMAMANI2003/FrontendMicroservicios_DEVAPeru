/* eslint-disable react/prop-types */
const Error = (props) => {
  const { showErrorMessage, errorMessage } = props;
  return (
    <>
      {showErrorMessage && (
        <div className="text-red-500 text-xs pt-1">{errorMessage}</div>
      )}
    </>
  );
};
export default Error;
