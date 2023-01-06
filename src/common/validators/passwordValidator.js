export function passwordValidator(value, data) {
  if (!value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
    return 'invalid password: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }

  return '';
}
