import Button, { type Props as ButtonProps } from '../Button/Button.tsx';
import { useState } from 'preact/hooks';
import Modal from '../Modal/Modal.tsx';

import useSubmitApplication from './useSubmitApplication.ts';
import ApplicationForm from './ApplicationForm.tsx';
import { GenericError } from '../GenericError/GenericError.tsx';

type PlanType = 'pro' | 'standard';

interface Props {
    planType?: PlanType;
    buttonText: string;
    items: string[];
    price?: number;
    important?: boolean;
}

const ServicesCard = (props: Props) => {
    const { planType: title, buttonText, items, price, important } = props;
    const [modalOpen, setModalOpen] = useState(false);

    const buttonProps: ButtonProps = important
        ? {
            color: 'pink',
            class: 'border-pink mt-auto from-purple-300 bg-gradient-to-r to-purple-700 hover:from-purple-400 hover:to-purple-800',
        }
        : {
            color: 'white',
            class: 'border-2 border-black mt-auto',
        };

    const { isError, isSubmitted, submitApplication, reset } =
        useSubmitApplication();

    const renderFormContent = () => {
        if (isSubmitted) {
            return (
                <div class="flex flex-col items-center justify-center">
                    <h4 class="text-xl font-semibold text-center mb-5 text-black/80">
                        Thank you for applying!
                    </h4>
                    <p class="text-[0.85rem]/[150%] text-center mb-6">
                        You have successfully applied for the{' '}
                        <span class="font-bold font-proxima-nova-bold capitalize">
                            {title}
                        </span>{' '}
                        plan. I'll reach out to you as soon as possible to
                        discuss the next steps.
                    </p>
                </div>
            );
        }
        if (isError) {
            return <GenericError />;
        }

        return (
            <>
                <h4 class="text-xl font-semibold text-center mb-5 text-black/80">
                    Great choice!
                </h4>
                <p class="text-[0.85rem]/[150%] text-center mb-6">
                    In order to apply, please fill in the information bellow and
                    I'll reach out to you as soon as possible
                </p>

                <ApplicationForm onSubmit={submitApplication} />
            </>
        );
    };
    return (
        <div class="bg-white relative flex flex-col gap-5 p-10 text-black md:w-[30rem] w-full">
            {title && (
                <h2 class="mb-3 font-semibold text-xl text-center capitalize">
                    {title}
                </h2>
            )}
            {price && (
                <div class="text-center">
                    <span class="text-lg mr-2">€</span>
                    <span class="text-4xl font-semibold font-sans text-black/80">
                        {price}
                    </span>
                    <span>/month</span>
                </div>
            )}

            <ul>
                {items.map((item) => (
                    <li class="border-b last-of-type:border-none text-slate-700 p-2 text-sm">
                        {item}
                    </li>
                ))}
            </ul>
            <Button
                class="border-2 mt-auto border-black"
                color="black"
                onClick={() => {
                    setModalOpen(true);
                }}
                {...buttonProps}
            >
                {buttonText}
            </Button>
            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    reset();
                }}
            >
                <div>{renderFormContent()}</div>
            </Modal>
        </div>
    );
};

export default ServicesCard;
