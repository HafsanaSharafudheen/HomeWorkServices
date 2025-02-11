import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import "./RegistrationSuccess.css";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container d-flex flex-column align-items-center justify-content-center vh-100 position-relative">
      
      {/* Floating Balloons */}
      {[...Array(7)].map((_, index) => (
        <motion.div
          key={index}
          className={`balloon balloon-${index + 1}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: [10, -50, -100, -200, -300], opacity: [0, 1, 1, 1, 0] }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Success Box */}
      <motion.div
        className="success-box text-center p-4 rounded shadow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaCheckCircle className="text-success icon-size" />
        </motion.div>

        <h2 className="text-success fw-bold">Wow! Signup Completed!</h2>
        <p className="text-muted">Thank you for registering. You can now log in and explore our services.</p>

        <motion.button
          className="DefaultButton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;
