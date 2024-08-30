const validate = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  mobile:
    /^\+?[1-9]\d{0,2}[ -]?(\(?\d{1,4}\)?[ -]?)?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,9}$/,
  password: /^.{9,}$/,
};

export { validate };
