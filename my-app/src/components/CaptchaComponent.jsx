import React, { useEffect, useState } from 'react';

const CaptchaComponent = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaText(`${num1} + ${num2}`);
    setCaptchaAnswer(num1 + num2);
    setUserAnswer('');
  };

  const handleVerify = () => {
    if (parseInt(userAnswer) === captchaAnswer) {
      alert('✅ CAPTCHA verified!');
      onVerify(true);
    } else {
      alert('❌ Wrong answer. Try again!');
      generateCaptcha();
      onVerify(false);
    }
  };

  return (
    <div className="text-left mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        CAPTCHA: {captchaText}
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="shadow border rounded w-full py-1 px-2 text-gray-700 focus:ring focus:ring-blue-400 focus:outline-none bg-white text-black"
          required
        />
        <button
          type="button"
          onClick={handleVerify}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default CaptchaComponent;
