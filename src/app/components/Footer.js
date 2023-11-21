import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center flex-col text-white text-xs italic my-4">
      <p>
        Created By{" "}
        <a href="https://twitter.com/Bolexzyy__" target="_blank">
          <span className="text-sky-200">Boluwatife Emmanuel</span>
        </a>
      </p>
      <p className="text-sm text-slate-300">© 2023</p>
    </div>
  );
};

export default Footer;
