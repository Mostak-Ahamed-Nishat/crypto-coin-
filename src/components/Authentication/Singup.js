import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";

const Singup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasssword, setConfirmPasssword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPasssword) {
      setAlert({
        open: true,
        message: "Password Doesn't match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: "Account Created Successfully",
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Confirm Password"
          value={confirmPasssword}
          onChange={(e) => setConfirmPasssword(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "gold" }}
          onClick={handleSubmit}
        >
          Singup
        </Button>
      </Box>
    </div>
  );
};

export default Singup;
