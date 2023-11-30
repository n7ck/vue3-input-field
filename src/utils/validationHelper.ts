import { ref } from 'vue';
import * as yup from 'yup';

/**
 *
 * @param schema a yup schema
 * @param data a reactive({...}) object with all input fields inside
 */
export function validationHelper(schema: yup.ObjectSchema<unknown>, data: object) {
	const errors = ref({}); // All Field Errors for Entire Form
	const validatedOnce = ref(false); // Track if the form has been validated at least once
	const isValidating = ref(false); // Track if validation is in progress

	const setError = (field, errorMessages) => {
		errors.value[field] = errorMessages;
	};
	const removeError = (field) => {
		delete errors.value[field];
	};
	const resetErrors = () => {
		errors.value = {};
	};

	// Create a Proxy around the `errors` object
	const errorsProxy = new Proxy(errors, {
		get(target, prop) {
			// Check if the property exists on the target
			if (prop in target.value) {
				return target.value[prop];
			}
			// Return an empty array for non-existent properties
			return [];
		},
	});

	return {
		validateForm: async () => {
			resetErrors();
			validatedOnce.value = true;
			isValidating.value = true;
			try {
				await schema.validate(data, { abortEarly: false });
			} catch (validationError) {
				validationError.inner.forEach((error) => {
					setError(error.path, error.errors);
				});
			} finally {
				isValidating.value = false;
			}
		},
		validateField: async (fieldString) => {
			removeError(fieldString);
			isValidating.value = true;
			try {
				await schema.validateAt(fieldString, data, { abortEarly: false });
			} catch (validationError) {
				validationError.inner.forEach((error) => {
					setError(error.path, error.errors);
				});
			} finally {
				isValidating.value = false;
			}
		},
		isFormValid: () => {
			return (
				validatedOnce.value && Object.keys(errors.value).length === 0 && !isValidating.value
			);
		},
		validateErrors: errorsProxy,
	};
}
