import * as React from "react";
import Box from "@mui/material/Box";
import { toast, Toaster } from "react-hot-toast";
import { styled } from "@mui/material/styles";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SideNav from "../SideNav";

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  ref as refDb,
  get,
  update,
} from "firebase/database";
import {
  ref as refStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { database, storage, app } from "../../Firebase/firebase.config";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Payment = () => {
  const { id } = useParams();
  const history = useHistory();

  const [qrImg, setQrImg] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [chatFee, setChatFee] = useState("");

  // LOAD QR + FEES
  useEffect(() => {
    const loadData = async () => {
      const snapshot = await get(refDb(database, `doctor/${id}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setChatFee(data.ChatConsultantFees || "");
        setQrUrl(data.QRUrl || "");
      }
    };
    loadData();
  }, [id]);

  // UPLOAD QR
  const handleQRUpload = () => {
    if (!qrImg) {
      toast.error("Please choose a QR image first!");
      return;
    }

    const imgRef = refStorage(storage, `QR/${id}`);
    const uploadTask = uploadBytesResumable(imgRef, qrImg);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => toast.error("Upload failed:", error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setQrUrl(url);
          update(refDb(database, `doctor/${id}`), { QRUrl: url });
          toast.success("QR Uploaded Successfully!");
        });
      }
    );
  };

  // SAVE AMOUNT
  const handleFeeSave = () => {
    update(refDb(database, `doctor/${id}`), {
      ChatConsultantFees: chatFee,
    })
      .then(() => toast.success("Consultation Fee Saved!"))
      .catch(() => toast.error("Error saving fee"));
  };

  const handleNext = () => history.push(`/Article/${id}`);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNav id={id} />

      <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",        // <-- keeps box in vertical center
    width: "100%",
    minHeight: "100vh",          // <-- pushes box away from top
    paddingTop: "40px",          // <-- extra gap from top
  }}
>
          <DrawerHeader />
          <Toaster toastOptions={{ duration: 3000 }} />

          {/* MAIN CARD */}
          <div
            style={{
              width: "100%",
              maxWidth: "700px",
              background: "white",
              padding: "2rem",
              borderRadius: "20px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "#126ca8" }}>
              Payment Details
            </h2>

            {/* QR SECTION */}
            <div className="mb-4">
              <h5 className="mb-3" style={{ color: "#333" }}>
                Upload QR Code
              </h5>

              <Form.Group className="d-flex flex-column flex-md-row align-items-center">
                <Form.Control
                  type="file"
                  onChange={(e) => setQrImg(e.target.files[0])}
                  className="pControl"
                  style={{ maxWidth: "300px" }}
                />
                <Button
                  onClick={handleQRUpload}
                  className="ms-md-3 mt-3 mt-md-0"
                >
                  Save QR
                </Button>
              </Form.Group>

              {qrUrl && (
                <div className="text-center mt-4">
                  <img
                    src={qrUrl}
                    alt="QR"
                    style={{
                      width: "60%",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
            </div>

            <hr />

            {/* CONSULTATION FEE SECTION */}
            <div className="mt-4">
              <h5 className="mb-3" style={{ color: "#333" }}>
                Consultation Fee
              </h5>

              <Form.Group className="d-flex flex-column flex-md-row align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Enter amount"
                  value={chatFee}
                  onChange={(e) => setChatFee(e.target.value)}
                  style={{ maxWidth: "300px" }}
                />
                <Button
                  onClick={handleFeeSave}
                  className="ms-md-3 mt-3 mt-md-0"
                >
                  Save Amount
                </Button>
              </Form.Group>
            </div>

            <div className="text-center mt-5">
              <Button
                variant="primary"
                onClick={handleNext}
                style={{ width: "7rem", padding: "0.7rem" }}
              >
                Next
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Payment;
