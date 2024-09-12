import { Form, Formik } from 'formik';
import FormikInput from '../Input/FormikInput.tsx';
import Button from '../Button/Button.tsx';
import { useRef } from 'preact/hooks';
import Altcha from '../Altcha/Altcha.tsx';
import schema from './schema.ts';
import type { SubmitApplicationBody } from './useSubmitApplication.ts';
import { PrivacyConsent } from '../PrivacyConsent/PrivacyConsent.tsx';

interface ApplicationFormProps {
    title?: string;
    onSubmit: (values: SubmitApplicationBody) => Promise<void>;
}
const ApplicationForm = (props: ApplicationFormProps) => {
    const { onSubmit, title } = props;
    const altchaRef = useRef<HTMLInputElement>(null);

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
                if (!altchaRef.current?.value) {
                    return;
                }
                onSubmit({ ...values, altcha: altchaRef.current?.value });
            }}
            initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                plan: title ?? 'Standard',
            }}
            validateOnChange={false}
            class="flex flex-col gap-2"
        >
            {({ isSubmitting }) => {
                return (
                    <Form>
                        <FormikInput
                            required
                            name="firstName"
                            label="First Name"
                            fullWidth
                        />

                        <FormikInput
                            required
                            name="lastName"
                            fullWidth
                            label="Last Name"
                        />
                        <FormikInput
                            required
                            name="email"
                            fullWidth
                            label="Email"
                        />
                        <FormikInput name="gender" fullWidth label="Gender" />
                        <FormikInput name="goal" fullWidth label="Goal" />
                        <FormikInput
                            name="fitnessExperience"
                            fullWidth
                            label="Fitness Experience"
                        />
                        <FormikInput
                            name="age"
                            type="number"
                            fullWidth
                            label="Age"
                        />

                        <Altcha ref={altchaRef} />
                        <PrivacyConsent />
                        <Button
                            class="border-2 w-full mt-5 border-black"
                            color="white"
                            type="submit"
                            loading={isSubmitting}
                        >
                            Apply
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ApplicationForm;
