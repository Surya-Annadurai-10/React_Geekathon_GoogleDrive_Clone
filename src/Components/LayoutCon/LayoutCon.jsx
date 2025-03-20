import React from "react";
import { useState } from "react";
import styles from "./LayoutCon.module.css";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { TbLayoutGrid } from "react-icons/tb";

const LayoutCon = ({ setBoxLayout, boxLayout }) => {
  //   const [boxLayout , setBoxLayout] = useState(false);

  return (
    <>
      <div className={styles.layoutCon}>
        <div
          onClick={() => setBoxLayout(false)}
          style={{ backgroundColor: boxLayout ? "white" : "#C2E7FF" }}
          className={styles.layBox}
        >
          {boxLayout ? null : (
            <IoMdCheckmark style={{ fontSize: "1.4rem", color: "green" }} />
          )}
          <MdOutlineMenu style={{ fontSize: "1.4rem" }} />
        </div>
        <div
          onClick={() => setBoxLayout(true)}
          style={{ backgroundColor: boxLayout ? "#C2E7FF" : "white" }}
          className={styles.layBox}
        >
          {/* <IoMdCheckmark  /> */}
          {boxLayout ? (
            <IoMdCheckmark style={{ fontSize: "1.4rem", color: "green" }} />
          ) : null}

          <TbLayoutGrid style={{ fontSize: "1.3rem" }} />
        </div>
      </div>
    </>
  );
};

export default LayoutCon;
