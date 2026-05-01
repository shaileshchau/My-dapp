document.addEventListener("DOMContentLoaded", () => {

  let provider;
  let signer;

  const connectBtn = document.getElementById("connectBtn");
  const sendBtn = document.getElementById("sendBtn");

  // 🔗 Connect Wallet
  connectBtn.onclick = async () => {

    if (!window.ethereum) {
      alert("Open in MetaMask Browser");
      return;
    }

    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();

      const address = await signer.getAddress();
      document.getElementById("wallet").innerText = "Connected: " + address;

    } catch (err) {
      alert("Connection Rejected");
    }
  };

  // 💸 Send ETH
  sendBtn.onclick = async () => {

    if (!signer) {
      alert("Connect wallet first");
      return;
    }

    try {
      const tx = await signer.sendTransaction({
        to: "YOUR_WALLET_ADDRESS", // 👉 અહીં તમારું address નાખો
        value: ethers.utils.parseEther("0.001")
      });

      await tx.wait();
      alert("Transaction Successful");

    } catch (err) {
      alert("Transaction Failed");
    }
  };

});
