export const formValidator = (formObject: any) => {
    const isObject = (obj: any) => {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };

    const isEmpty = (fieldValue: string) => {
        let isEmpty;

        if (typeof fieldValue === "string") {
            isEmpty = fieldValue.trim() === "" || fieldValue === undefined;
        }

        if (typeof fieldValue === "undefined") {
            isEmpty = true;
        }

        if (fieldValue === null) {
            isEmpty = true;
        }

        if (Array.isArray(fieldValue)) {
            isEmpty = fieldValue.length === 0 || fieldValue === undefined;
        }

        if (isObject(fieldValue)) {
            isEmpty = !Object.values(fieldValue).some((val) => val);
        }

        return isEmpty;
    };

    let formErrors = {} as any;
    let isValid = true;

    Object.keys(formObject).forEach((field) => {
        const value = formObject[field] as string

        if (isEmpty(value)) {
            formErrors[field] = "This field cannot be empty";
        }
        if (field === "email") {
            const isEmailValid =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    formObject[field]
                );
            formErrors[field] = isEmailValid
                ? false
                : "please enter a valid email";
        }
        if (field === "password") {
            if (formObject[field].length < 6) {
                const isPasswordShort = formObject[field].length > 6;
                formErrors[field] = isPasswordShort
                    ? false
                    : "Password must have at least 6 characters";
            }

        }

    });

    Object.values(formErrors).forEach((error: any) => {
        if (error || error.length > 0) isValid = false;
    });

    return { formErrors, isValid };
};
