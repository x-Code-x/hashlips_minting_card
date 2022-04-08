import React from "react";

const Image = () => (
  <img
    alt="should be cropped by container overflow:hidden style"
    style={styles.image}
    src="https://gateway.pinata.cloud/ipfs/QmeZksEGADrQTerGB83oFUqtfYVAMJ71JS43a5fNLPq1ax/000000000000000000000000000000000000000000000000000000000bronze2.png"
  />
);

const styles = {
  image: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  }
};

export default Image;
