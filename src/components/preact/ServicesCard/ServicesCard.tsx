import Button, { type Props as ButtonProps } from '../Button/Button.tsx';
import { useState } from 'preact/hooks';
import Modal from '../Modal/Modal.tsx';

import useSubmitApplication from './useSubmitApplication.ts';
import ApplicationForm from './ApplicationForm.tsx';
import { GenericError } from '../GenericError/GenericError.tsx';
import { CheckIcon } from '@heroicons/react/20/solid';
import Price from './Price.tsx';

export type PlanType = 'premium' | 'basic';

interface Props {
    details?: string;
    planType: PlanType;
    buttonText: string;
    items: string[];
    price?: number;
    fullPrice?: number;
}

const ServicesCard = (props: Props) => {
    const { planType, buttonText, items, price, fullPrice, details } = props;
    const [modalOpen, setModalOpen] = useState(false);

    const buttonProps: ButtonProps = {
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
                        <span class="font-raleway font-bold capitalize">
                            {planType}
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
                    In order to apply, for the{' '}
                    <span class="font-raleway font-bold">{planType}</span> plan,
                    please fill in the information bellow and I'll reach out to
                    you as soon as possible
                </p>

                <ApplicationForm
                    planType={planType}
                    pack="single"
                    onSubmit={submitApplication}
                    onCancel={() => setModalOpen(false)}
                />
            </>
        );
    };
    return (
        <div class="relative flex flex-col gap-5 p-5 text-black md:w-[25rem] w-full bg-white">
            {planType && (
                <div class="flex justify-between">
                    <h2 class="font-semibold text-xl capitalize">{planType}</h2>
                </div>
            )}
            {price && (
                <Price
                    showSavings={false}
                    monthly
                    price={price}
                    full={fullPrice}
                />
            )}
            {details && <div class="text-sm text-gray-500">{details}</div>}
            <hr />

            <ul class="flex-1">
                {items.map((item) => (
                    <li class="text-slate-700 p-2 text-sm flex gap-5 justify-start">
                        <CheckIcon class="w-5 shrink-0 fill-green-500" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            <hr />
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
