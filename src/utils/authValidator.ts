import Joi from "joi";

// Used mostly AI advice, since I always forget regex patterns
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
const passwordSpecialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
const passwordUppercaseRegex = /[A-Z]/;
const passwordLowercaseRegex = /[a-z]/;
const passwordDigitRegex = /[0-9]/;

export const registerSchema = Joi.object({
  username: Joi.string().pattern(usernameRegex).required().messages({
    "string.pattern.base":
      "Username must be 3-30 characters long and can only contain letters, numbers, and underscores.",
  }),
  password: Joi.string()
    .min(8)
    .pattern(passwordSpecialCharacterRegex)
    .pattern(passwordUppercaseRegex)
    .pattern(passwordLowercaseRegex)
    .pattern(passwordDigitRegex)
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    }),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
