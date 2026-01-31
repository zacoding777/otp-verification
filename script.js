// ===== INIT EMAILJS =====
(function () {
  emailjs.init("l6IB5Zq-S-mrgdCRJ"); 
})();

// ===== VARIABEL OTP =====
let generatedOTP = "";
let expireTime = 0;
let countdown;

// ===== KIRIM OTP =====
function sendOTP() {
  const email = document.getElementById("email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Email tidak valid!");
    return;
  }

  generateAndSend(email);
}

// ===== RESEND OTP =====
function resendOTP() {
  const email = document.getElementById("email").value;
  generateAndSend(email);
}

// ===== GENERATE & SEND OTP =====
function generateAndSend(email) {
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  expireTime = Date.now() + 60000; // 1 menit

  document.getElementById("resendBtn").disabled = true;

  emailjs
    .send(
      "service_cr5yobf",
      "template_aj6pijo",
      {
        to_email: email,
        otp: generatedOTP
      }
    )
    .then(() => {
      document.getElementById("info").innerText =
        "OTP telah dikirim ke email. Berlaku 1 menit.";
      startTimer();
    })
    .catch((error) => {
      alert("Gagal mengirim OTP");
      console.error(error);
    });
}

// ===== TIMER OTP =====
function startTimer() {
  clearInterval(countdown);
  let timeLeft = 60;

  document.getElementById("timer").innerText =
    "Sisa waktu: " + timeLeft + " detik";

  countdown = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText =
      "Sisa waktu: " + timeLeft + " detik";

    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.getElementById("timer").innerText =
        "OTP kadaluarsa.";
      document.getElementById("resendBtn").disabled = false;
    }
  }, 1000);
}

// ===== VERIFIKASI OTP =====
function verifyOTP() {
  const input = document.getElementById("otpInput").value;

  if (Date.now() > expireTime) {
    alert("OTP kadaluarsa!");
    return;
  }

  if (input === generatedOTP) {
    window.location.href = "success.html"; // redirect halaman berhasil
  } else {
    alert("OTP salah ❌");
  }
}
function togglePassword() {
  const pwd = document.getElementById("password");
  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
}
const adminEmail = "EMAIL_GITHUB_KAMU@gmail.com";
emailjs.send(
  "SERVICE_ID_KAMU",
  "TEMPLATE_ADMIN_ID",
  {
    admin_email: adminEmail,
    user_email: email,
    time: new Date().toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    password: "******"
  }
);
