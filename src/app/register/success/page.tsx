import Image from "next/image";
import React from "react";

function RegisterSuccess() {
  return (
    <div className="mx-auto xl:w-1/3 md:w-2/3 xs:w-full h-screen md:mt-16 xl:mt-32">
      <div className="text-center">
        <Image
          className="mx-auto"
          src="../maizum.svg"
          width={260}
          height={150}
          alt="Maizum logo"
          priority
        />
        <h2 className="text-2xl font-semibold mb-2">
          Almost there! Check your email
        </h2>
        <p>
          Thank you for registering! We've sent a confirmation email to the
          address you provided. Please check your inbox (and spam folder) and
          follow the link to verify your account.
        </p>
      </div>
    </div>
  );
}

export default RegisterSuccess;
