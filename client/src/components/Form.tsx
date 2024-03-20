import React, { useState } from 'react';
import { UserProps } from '../interface';
import { useAppDispatch } from '../redux/hooks';
import { isEmptyString, validateEmail, validatePassword, checkAge } from '../utils/validate';
import axios from 'axios';
import { serverUrl } from '../utils/route';
import { ErrorNotifier, SuccessNotifier } from '../utils/Notification';
import { setLoader } from '../redux/features/users/userSlice';

const initialUserState: UserProps = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  dateOfBirth: '',
};

const Form = () => {
  const initialState = initialUserState;
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(initialState);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const emptyField = () => {
    setErrors(initialState);
    setFormData(initialState);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const fieldsToUserValidate = [
    'firstName',
    'lastName',
    'email',
    'password',
    'phoneNumber',
    'dateOfBirth',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { ...initialUserState };

    let fieldsToValidate = fieldsToUserValidate;
    let hasErrors = false;

    fieldsToValidate.forEach((field) => {
      let fieldValue: string | number | undefined;

      fieldValue = (formData as UserProps)[field as keyof UserProps];

      if (!fieldValue) {
        newErrors = {
          ...newErrors,
          [field]: 'This field is required',
        };
        hasErrors = true;
      } else {
        newErrors = {
          ...newErrors,
          [field]: '',
        };
      }
    });

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email';
      hasErrors = true;
    }

    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one digit';
      hasErrors = true;
    }

    if (!formData.firstName) {
      newErrors.firstName = 'Please provide first name';
      hasErrors = true;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Please provide last name';
      hasErrors = true;
    }

    if (
      !formData.phoneNumber ||
      formData.phoneNumber.length < 5 ||
      formData.phoneNumber.length > 20
    ) {
      newErrors.phoneNumber = 'Please provide a valid phone number';
      hasErrors = true;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Please provide date of birth';
      hasErrors = true;
    }

    if (checkAge(formData.dateOfBirth) < 18) {
      newErrors = {
        ...newErrors,
        dateOfBirth: 'Age must be at least 18',
      };
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      const url = `${serverUrl}/api/v1/users/create`;
      const method = 'post';
      const successMessage = `User created successfully`;

      const response = await axios({
        method,
        url,
        data: formData,
      });

      if (response.data) {
        SuccessNotifier(successMessage);
        dispatch(setLoader(true));
        emptyField();
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }
    } catch (error) {
      ErrorNotifier('Sorry, an error occurred');
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="form__container" id="form__container" data-testid="form__container">
      <div className="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 flex flex-col mb-6">
          <div className="mb-6 md:mb-3">
            <label
              className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              className={`${
                isEmptyString(errors.email) ? 'input' : 'input-invalid'
              } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
              id="email"
              placeholder="-- Enter Email --"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="text-red-900 text-sm">{errors.email}</div>
          </div>
          <div className="mb-6 md:mb-3">
            <label
              className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className={`${
                isEmptyString(errors.password) ? 'input' : 'input-invalid'
              } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
              id="nationalIdNumber"
              placeholder="-- Enter Password --"
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="text-red-900 text-sm">{errors.password}</div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal mb-2"
                htmlFor="firstName">
                First Name
              </label>
              <input
                className={`${
                  isEmptyString(errors.firstName) ? 'input' : 'input-invalid'
                } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                id="firstName"
                placeholder="-- Enter First Name --"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <div className="text-red-900 text-sm">{errors.firstName}</div>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal mb-2"
                htmlFor="lastName">
                Last Name
              </label>
              <input
                className={`${
                  isEmptyString(errors.firstName) ? 'input' : 'input-invalid'
                } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                id="lastName"
                placeholder="-- Enter Last Name --"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <div className="text-red-900 text-sm">{errors.lastName}</div>
            </div>
          </div>

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal mb-2"
                htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className={`${
                  isEmptyString(errors.phoneNumber) ? 'input' : 'input-invalid'
                } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                id="phoneNumber"
                placeholder="-- Enter Phone Number --"
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <div className="text-red-900 text-sm">{errors.phoneNumber}</div>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal font-bold mb-2"
                htmlFor="dateOfBirth">
                Date of birth
              </label>
              <input
                className={`${
                  isEmptyString(errors.dateOfBirth) ? 'input' : 'input-invalid'
                } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <div className="text-red-900 text-sm">{errors.dateOfBirth}</div>
            </div>
          </div>

          <div className="flex flex-end justify-end items-center">
            <button
              type="button"
              onClick={emptyField}
              className="mr-3 text-gray-900 cursor-pointer">
              Cancel
            </button>

            <button
              className={`flex flex-row navy bg-gray-900 capitalize hover:bg-gray-700 text-white font-[semi-bold] py-2 px-4 rounded ${
                isSubmitting && 'opacity-50'
              }`}
              onClick={handleSubmit}
              onKeyDown={handleEnterKeyPress}
              disabled={isSubmitting}>
              {isSubmitting && (
                <div aria-label="Loading..." role="status" className="mr-1">
                  <svg className="h-5 w-5 animate-spin" viewBox="3 3 18 18">
                    <path
                      className="fill-gray-200"
                      d="M12 5C8.13401 5 5 8.13401 5 12c0 3.866 3.13401 7 7 7 3.866.0 7-3.134 7-7 0-3.86599-3.134-7-7-7zM3 12c0-4.97056 4.02944-9 9-9 4.9706.0 9 4.02944 9 9 0 4.9706-4.0294 9-9 9-4.97056.0-9-4.0294-9-9z"></path>
                    <path
                      className="fill-gray-800"
                      d="M16.9497 7.05015c-2.7336-2.73367-7.16578-2.73367-9.89945.0-.39052.39052-1.02369.39052-1.41421.0-.39053-.39053-.39053-1.02369.0-1.41422 3.51472-3.51472 9.21316-3.51472 12.72796.0C18.7545 6.02646 18.7545 6.65962 18.364 7.05015c-.390599999999999.39052-1.0237.39052-1.4143.0z"></path>
                  </svg>
                </div>
              )}
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
