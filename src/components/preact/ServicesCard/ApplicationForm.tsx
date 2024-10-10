import { Form, Formik } from 'formik';
import FormikInput from '../Input/FormikInput.tsx';
import Button from '../Button/Button.tsx';
import { useRef } from 'preact/hooks';
import Altcha from '../Altcha/Altcha.tsx';
import schema from './schema.ts';
import type { SubmitApplicationBody } from './useSubmitApplication.ts';
import { PrivacyConsent } from '../PrivacyConsent/PrivacyConsent.tsx';
import FormikSelect from '../Select/FormikSelect.tsx';

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

                        <FormikInput
                            name="age"
                            type="number"
                            fullWidth
                            label="Age"
                        />

                        <FormikSelect
                            options={[
                                {
                                    value: 'weight-loss',
                                    label: 'Weight loss'
                                }, {
                                    value: 'improve-lifestyle',
                                    label: 'Improve lifestyle',
                                },
                                {
                                    value: 'build-muscle',
                                    label: 'Build muscle',
                                }
                            ]}
                            name="goal"
                            label="Goal"
                        />
                        <FormikSelect
                            name="experience"
                            label="Fitness Experience"
                            options={[
                                {
                                    value: 'beginner',
                                    label: 'Beginner (0 - 1 years)'
                                }, {

                                    value: 'intermediate',
                                    label: 'Intermediate (1 - 3 years)',
                                }, {

                                    value: 'advanced',
                                    label: 'Advanced (More than 3 years)'
                                }

                            ]}
                        />
                        <FormikSelect
                            label='Gender'
                            name='gender'
                            options={[
                                {
                                    value: 'male',
                                    label: 'Male',

                                }, {
                                    value: 'female',
                                    label: 'Female'
                                }, {
                                    value: 'unknown',
                                    label: 'Prefer not to say'
                                }
                            ]}
                        />

                        <FormikInput label='Message' name="message" multiline fullWidth />

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
