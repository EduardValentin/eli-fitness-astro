import { Form, Formik } from 'formik';
import FormikInput from '../../../../components/preact/Input/FormikInput';
import Altcha from '../../../../components/preact/Altcha/Altcha';
import { useEffect, useRef } from 'preact/hooks';
import Button from '../../../../components/preact/Button/Button';
import useEBookRequest from './useEBookRequest';
import schema from './schema';
import { GenericError } from '../../../../components/preact/GenericError/GenericError';
import { PrivacyConsent } from '../../../../components/preact/PrivacyConsent/PrivacyConsent';
import usePrevious from '../../../../components/preact/hooks/usePrevious';

function EBookRequestForm() {
    const altchaRef = useRef<HTMLInputElement>(null);

    const { isSubmitted, isError, doRequest } = useEBookRequest();
    const prevIsSubmitted = usePrevious(isSubmitted);

    useEffect(() => {
        if (isSubmitted === prevIsSubmitted) {
            return;
        }

        if (isSubmitted && !isError) {
            window.location.pathname = '/ebook/confirmation';
        }
    }, [isSubmitted, prevIsSubmitted]);
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                altcha: '',
            }}
            validateOnChange={false}
            validationSchema={schema}
            onSubmit={(values) => {
                if (!altchaRef.current?.value) {
                    return;
                }
                return doRequest({
                    ...values,
                    altcha: altchaRef.current?.value,
                });
            }}
        >
            {({ isSubmitting }) => {
                if (isError) {
                    return <GenericError />;
                }

                if (isSubmitted) {
                    return (
                        <div class="flex-1 pt-40">
                            <div class="px-40">
                                <h1 class="text-center text-3xl mb-10">
                                    Thank you for your interest
                                </h1>
                                <div class="text-center font-normal">
                                    An email will be sent to your address. If
                                    you are using Gmail make sure you search on
                                    the Updates tab. Enjoy your E-Book!
                                </div>
                                <Button
                                    color="pink"
                                    class="text-center mt-20"
                                    href="/"
                                >
                                    Go back
                                </Button>
                            </div>
                        </div>
                    );
                }

                return (
                    <Form class="px-10 md:px-10 lg:px-32 w-full">
                        <FormikInput
                            classes={{
                                input: 'pt-7 pb-3 bg-[#dbd9d6] placeholder-gray-600',
                            }}
                            fullWidth
                            name="name"
                            placeholder="Name"
                        />

                        <FormikInput
                            classes={{
                                input: 'pt-7 pb-3 bg-[#dbd9d6] placeholder-gray-600',
                            }}
                            required
                            fullWidth
                            name="email"
                            type="email"
                            placeholder="Email *"
                        />

                        <Altcha ref={altchaRef} />

                        <PrivacyConsent />

                        <Button
                            loading={isSubmitting}
                            type="submit"
                            color="pink"
                            class="w-full mt-20"
                        >
                            Send
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default EBookRequestForm;
