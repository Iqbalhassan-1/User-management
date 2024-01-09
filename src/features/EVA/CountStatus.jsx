import React from "react";
// image
import approveImg from "../../assets/approve-img.svg";
import correctImg from "../../assets/correct-img.svg";
import rejectImg from "../../assets/reject-img.svg";

const CountStatus = ({ approvedCount, rejectedCount, correctionCount, t }) => {
  if (!approvedCount && !rejectedCount && !correctionCount) {
    return null; // or you can return a default message or another component
  }
  return (
    <div className="flex justify-between items-center">
      <div>
        <img src={approveImg} alt="approve-img" />
        <p>
          {t("Approvals")} <span className="font-bold">({approvedCount})</span>
        </p>
      </div>
      {(correctionCount !== undefined && correctionCount === 0) ||
        (correctionCount > 0 && (
          <div>
            <img src={correctImg} alt="correct-img" />
            <p>
              {t("Corrections")}{" "}
              <span className="font-bold">({correctionCount})</span>
            </p>
          </div>
        ))}

      <div>
        <img src={rejectImg} alt="reject-img" />
        <p>
          {t("Rejections")} <span className="font-bold">({rejectedCount})</span>
        </p>
      </div>
    </div>
  );
};

export default CountStatus;
