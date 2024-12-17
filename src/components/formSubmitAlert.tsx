import React from "react";

interface FormSubmitAlertProps {
  title: string;
  message?: string;
  closeCallback: () => void;
}

function FormSubmitAlert(props: FormSubmitAlertProps) {
  const { title, message, closeCallback } = props;

  return (
    <div role="alert" className="alert alert-error flex justify-between">
      <div>
        <h3 className="font-bold">{title}</h3>
        <div className="text-xs">{message}</div>
      </div>
      <button
        onClick={closeCallback}
        className="btn btn-sm btn-error shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-black h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 6l12 12M6 18L18 6"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default FormSubmitAlert;
