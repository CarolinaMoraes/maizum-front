import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputWithErrorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  inputId: string;
  registerError?: UseFormRegister;
  error:
    | undefined
    | {
        title: string;
        message?: string;
        show: boolean;
      };
}

function InputWithError(props: InputWithErrorProps): React.ReactElement {
  const { labelName, inputId, registerError, error, ...customProps } = props;

  return (
    <label className="form-control" htmlFor={inputId}>
      <span className="label label-text">{labelName}</span>{" "}
      <input
        className="mb-4 input input-bordered w-full"
        id={inputId}
        {...registerError}
        {...customProps}
      />
      {error?.show && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error.title}</span>
          {error.message ?? <p>{error?.message}</p>}
        </div>
      )}
    </label>
  );
}

export default InputWithError;
