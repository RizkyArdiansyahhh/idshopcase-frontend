type ErrorMessageInputPropsType = {
  message?: string;
};

const ErrorMessageInput = (props: ErrorMessageInputPropsType) => {
  const { message } = props;
  return (
    <>
      <p className="text-red-500">{message}</p>
    </>
  );
};

export default ErrorMessageInput;
