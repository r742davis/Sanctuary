type Options = {
  fieldName?: string;
  minLength?: number;
  maxLength?: number;
};

export const sanitizeAndValidateInput = (input: string, options: Options = { minLength: 20, maxLength: 300 }) => {
  const { fieldName, minLength = 20, maxLength = 300 } = options;
  const allowedCharactersRegex = /^[a-zA-Z0-9\s.,'"\-!?@#&()]*$/;

  input = input.trim();

  if (input.length < minLength || input.length > maxLength)
    throw new Error(`${fieldName ?? "Input"} length must be between ${minLength} and ${maxLength} characters.`);
  if (!allowedCharactersRegex.test(input)) throw new Error(`${fieldName ?? "Input"} contains invalid characters.`);

  input = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  return input;
};
