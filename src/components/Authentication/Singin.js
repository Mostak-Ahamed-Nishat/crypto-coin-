import { async } from "@firebase/util";
import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";

const Singin = ({ handleClose }) => {
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Email or password wrong",
        type: "error",
      });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: "Login Successfully",
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "gold" }}
          onClick={handleSubmit}
        >
          Singin
        </Button>
      </Box>
    </div>
  );
};

export default Singin;
