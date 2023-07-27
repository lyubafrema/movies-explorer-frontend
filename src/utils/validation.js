const emailRegEx = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,10})+$/;
const nameRegEx = /^[a-zA-Zа-яА-Я\sё-]+$/;

export function validateEmail(email) {
  if (email !== undefined) {
    if (email.length === 0) {
      return { invalid: true, message: "Заполните это поле!" };
    } else if (!emailRegEx.test(email.toLowerCase())) {
      return { invalid: true, message: "Неверный формат почты!" };
    } else if (emailRegEx.test(email.toLowerCase())) {
      return { invalid: false, message: "" };
    }
  } else {
    return { invalid: true, message: "" };
  }
}

export function validateName(name) {
  if (name !== undefined) {
    if (name.length === 0) {
      return { invalid: true, message: "Заполните это поле!" };
    } else if (!nameRegEx.test(name.toLowerCase())) {
      return { invalid: true, message: "Имя может содержать только кириллические и латинские буквы, пробел и дефис" };
    } else if (nameRegEx.test(name.toLowerCase())) {
      return { invalid: false, message: "" };
    }
  } else {
    return { invalid: true, message: "" };
  }
}