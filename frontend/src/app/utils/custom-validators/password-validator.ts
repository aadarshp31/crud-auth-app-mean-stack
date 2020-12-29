import { FormGroup } from "@angular/forms";

export const passwordMatch = (controlName: string, controlNameToCompare: string) => (formGroup: FormGroup) => {
  const password = formGroup.controls[controlName]
  const confPassword = formGroup.controls[controlNameToCompare]

  if (password.value !== confPassword.value) {
    confPassword.setErrors({ mustmatch: true })
  } else if (password.value === confPassword.value) {
    confPassword.setErrors(null)
  }
}